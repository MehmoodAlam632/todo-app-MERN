const controller = require('../controllers/todo.controller');
const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

router.get('/', [authJwt.verifyToken], controller.getAllTodosData);
router.get('/unique/:id', [authJwt.verifyToken], controller.getTodoBy_Id);
router.post('/add',  [authJwt.verifyToken], controller.addNewTodoHandler);
router.put('/update/:id', [authJwt.verifyToken], controller.updateTodoHandler);
router.put('/delete/:id', [authJwt.verifyToken], controller.deleteTodoHandler);

module.exports = router;