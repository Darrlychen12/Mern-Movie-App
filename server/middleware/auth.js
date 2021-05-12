  
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    // res.header('Content-Type', 'application/json;charset=UTF-8')
    // res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    // res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    // res.header('Access-Control-Allow-Credentials', 'true')
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')

    next();
  } catch (err) {
    console.error(err);
    throw error
  }
}

module.exports = auth;
