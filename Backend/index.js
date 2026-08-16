require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const mongoose = require("mongoose");


const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");
const initRepo = require("./Controllers/init");
const addRepo = require("./Controllers/add");
const commitRepo = require("./Controllers/commit");
const pullRepo = require("./Controllers/pull");
const pushRepo = require("./Controllers/push");
const revertRepo = require("./Controllers/revert");
const mainRouter = require("./routes/main.router");

yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialse a repository", {}, initRepo)
    .command("add <file>", "Add a file to the repository", (yargs) => {
        yargs.positional("file",{
            describe: "File to add to the staging area",
            type: "string",
        });
    }, 
        (argv) =>{
            addRepo(argv.file);
        }
    )
    .command("commit <message>", "Commit the staged files",(yargs)=>{
        yargs.positional("message", {
            describe: "Commit message",
            type:"string"
        });
    } , 
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("pull", "Pull commits to S3", {}, pullRepo)
    .command("push", "Push commits to S3", {}, pushRepo)
    .command("revert <commitID>", "Revert to a specific commit",(yargs)=>{
        yargs.positional("commitID", {
            describe: "Commit ID to revert to",
            type: "string",
        })
    } , 
        (argv) => {
            revertRepo(argv.commitID);
        }
    )
    .demandCommand(1, "Need at least one command")
    .help().argv;

function startServer(){
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURL = process.env.MONGODB_URL;

    mongoose
        .connect(mongoURL)
        .then(() => console.log("Mongodb successfully connected"))
        .catch((err) => console.error("Unable to connect :", err));

    app.use(cors({origin: '*'}));

    app.use("/", mainRouter);

    let user = "test";
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("====");
            console.log(user);
            console.log("====");
            socket.join(userID);
        })
    });

    const db = mongoose.connection;
    db.once("open", async () =>{
        console.log("CRUD operations called");
    });

    httpServer.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    });
}