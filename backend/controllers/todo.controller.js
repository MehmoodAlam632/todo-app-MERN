const db = require('../models');
const Todo = db.todo;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.getAllTodosData = (req, res) => {
    let userId;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        userId = decoded.id;
    });

    Todo.find({ user: userId})
        .then(todos => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "All todos data.",
                data: todos
            })
        }).catch(error => {
            res.status(500).send("Please try again!");
        });
};

exports.addNewTodoHandler = (req, res) => {

    const { todo_title, todo_description, todo_priority, todo_completed } = req.body;

    let userId;

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        userId = decoded.id;
    })

    let todo = new Todo({
        todo_description: req.body.todo_description,
        todo_title: req.body.todo_title,
        todo_priority: req.body.todo_priority,
        todo_completed: req.body.todo_completed,
        user: userId
    });
    todo.save()
        .then(todo => {
            res.status(201).json({
                success: true,
                status: 201,
                message: 'Task Added Successfully!',
                data: {
                    todo_description: req.body.todo_description,
                    todo_title: req.body.todo_title,
                    todo_priority: req.body.todo_priority,
                    todo_completed: req.body.todo_completed,
                    user: userId
                }
            });
        })
        .catch(error => {
            res.status(400).json({
                message: error?.message,
                success: false,
                status: 400,
            });
        });
};

exports.getTodoBy_Id = (req, res) => {
    let id = req.params.id;
    Todo.findOne(id)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Todo data.",
                data: todo
            })
        }).catch(error => {
            res.status(500).send({
                message: 'Not found',
                status: 500,
                success: false
            });
        });
};

exports.updateTodoHandler = (req, res) => {
    let id = req.params.id
    Todo.findByIdAndUpdate(id, req.body)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Task updated successfully!",
                // data: todo
            })
        })
        .catch(error => {
            res.status(400).send('Bad request');
        });
};

exports.deleteTodoHandler = (req, res) => {
    let id = req.params.id
    Todo.findByIdAndDelete(id, req.body)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Task deleted successfully!",
                // data: todo
            })
        })
        .catch(error => {
            res.status(400).send('Bad request');
        });
};