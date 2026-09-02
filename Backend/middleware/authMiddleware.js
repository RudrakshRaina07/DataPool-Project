const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                error: "No authorization token provided"
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                error: "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decodedToken;
        next();

    } catch (error) {
        console.error("Authentication error: ", error.message)

        return res.status(401).json({
            error: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware