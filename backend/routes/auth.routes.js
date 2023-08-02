const controller = require("../controllers/auth.controller");
const express = require('express');
const router = express.Router();

router.post('/api/auth/signup', controller.signup);
router.post('/api/auth/signin', controller.signin);

module.exports = router;
