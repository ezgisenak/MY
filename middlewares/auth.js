let express = require('express');
let router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401); //httperror
    }
};
router.get('/',authenticateJWT);


// function authenticateToken(req, res, next) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token === null) return res.sendStatus(401);
//     jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

module.exports = router;