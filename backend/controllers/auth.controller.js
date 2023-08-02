const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    // Check duplicate userName
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

    // Check duplicate email
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

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save()
        .then(user => {
            res.status(200).json({
                success: true,
                message: "User register successfully!",
                data: user,
                status: 200
            })
        })
        .catch(error => {
            res.status(300).send({ message: error })
        });
};

exports.signin = (req, res) => {
    // console.log('req==========?', req)
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log('user?._id :>> ',typeof user?._id);
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            };
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                    status: 401
                });
            } else {
                const token = jwt.sign({ id: user.id }, config.secret, {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });
                res.status(200).json({
                    success: true,
                    userID: user._id,
                    username: user.username,
                    email: user.email,
                    accessToken: token,
                    message: "Logged In successfully!",
                    status: 200
                })
            }
        })
        .catch(error => {
            res.status(500).send({ message: error })
        });
}
