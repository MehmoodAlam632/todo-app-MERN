const mongoose = require('mongoose');

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        todo_description: {
            type: String,
            required: true,
        },
        todo_title: {
            type: String,
            required: true,
        },
        todo_priority: String,
        todo_completed: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Todo;
