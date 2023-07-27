const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {

    function getToken(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            return req.headers.authorization.split(" ")[1];
        };
        return null;
    };

    let token = getToken(req);

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    };

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Unauthorized!" })
        };
        req.user_Id = decoded.indexOf;
        next();
    });
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;