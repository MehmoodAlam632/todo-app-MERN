const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();

const PORT = process.env.PORT || 5000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mehmoodalam:MongoDB123@cluster0.uq7gkp9.mongodb.net/todos')
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error));

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

todoRoutes.route('/').get((req, res) => {
    Todo.find()
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
});

todoRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Todo.findById(id)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Todo data.",
                data: todo
            })
        }).catch(error => {
            res.status(500).send('Not found');
        })
    // Todo.findById(id, (err, todo) => {
    //     res.json(todo);
    // });
});

todoRoutes.route('/update/:id').post((req, res) => {
    let id = req.params.id
    Todo.findByIdAndUpdate(id, req.body)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Todo update successfully!",
                // data: todo
            })
        })
        .catch(error => {
            res.status(400).send('Bad request');
        });
});

todoRoutes.route('/delete/:id').post((req, res) => {
    let id = req.params.id
    Todo.findByIdAndDelete(id, req.body)
        .then(todo => {
            res.status(200).json({
                status: 200,
                success: true,
                message: "Todo delete successfully!",
                // data: todo
            })
        })
        .catch(error => {
            res.status(400).send('Bad request');
        });
});

todoRoutes.route('/add').post((req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(201).json({
                success: true,
                status: 201,
                message: 'Todo Added Successfully',
                data: todo
            });
        })
        .catch(error => {
            res.status(400).send("Adding new todo failed.");
        });
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: http://localhost:${PORT}`);
});