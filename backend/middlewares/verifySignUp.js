const db = require('../models');

const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({ username: req?.body?.username })
        .then(user => {
            if (user) {
                return res.status(400).send({ message: "Failed! Username is already in use!" });
            };
        })
        .catch(error => {
            if (error) {
                return res.status(500).send({ message: error });
            };
        });

    // Email
    User.findOne({ email: req?.body?.email })
        .then(user => {
            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            };
        })
        .catch(error => {
            if (error) {
                return res.status(500).send({ message: error });
            };
        });
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;