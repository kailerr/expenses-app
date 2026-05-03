// ============================================================
// protects route require user auth
// ============================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// function to protect route
const authMiddleware = async (req, res, next) => 
{
    let token;

    // check if auth header exists and have Bearer
    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) 
    {
        try 
        {
            // get token from header
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user with no password
            req.user = await User.findById(decoded.id).select("-password");

            // if user not found
            if (!req.user) 
            {
                return res.status(401).json({ message: "User not found" });
            }

            // continue to next middleware
            next();

        } 
        catch (error) 
        {
            console.error("Token error:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    
    else 
    {
        return res.status(401).json({ message: "No token provided" });
    }
};

module.exports = authMiddleware;