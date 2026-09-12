#!/usr/bin/env node

const initRepo = require("../commands/init");
const addRepo = require("../commands/add");
const commitRepo = require("../commands/commit");
// const pushRepo = require("../commands/push");

const command = process.argv[2]

if(command === "init"){
    const repoId = process.argv[3]
    initRepo(repoId)
}else if(command === "add"){
    const filePath = process.argv[3]

    if(!filePath){
        console.log("Please provide a file to add");
        process.exit(1)
    }

    addRepo(filePath)
}else if(command === "commit"){
    const flag = process.argv[3]
    const message = process.argv[4]

    if(flag !== "-m" || !message){
        console.log('Usage: datapool commit -m "commit message"');
        process.exit(1)
    }

    commitRepo(message)
}else if(command === "push"){
    const pushRepo = require("../commands/push")
    pushRepo()
}else if(command === "pull"){
    const pullRepo = require("../commands/pull");
    pullRepo()
}else if(command === "revert"){
    const commitId = process.argv[3]

    if(!commitId){
        console.log("Please provide a commit ID");
        process.exit(1)
    }

    const revertRepo = require("../commands/revert")
    revertRepo(commitId)
}
else{
    console.log("Datapool CLI");
}