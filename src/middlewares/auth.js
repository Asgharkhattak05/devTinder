const JWT = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing." });
        }
        
        const decodedData = JWT.verify(token, "your_secret_key"); 
        const { _id } = decodedData;
        
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user; // Attach user data to the request
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid authentication token." });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired." });
        }
        console.error("Error in userAuth middleware:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = userAuth;

