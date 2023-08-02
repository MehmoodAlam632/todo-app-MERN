const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes')
app.use('/', authRoutes);
app.use('/api/todos', todoRoutes);

mongoose.connect('mongodb+srv://mehmoodalam:MongoDB123@cluster0.uq7gkp9.mongodb.net/todos')
    .then(() => console.log("Connected to database"))
    .catch(error => console.log(error));

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: http://localhost:${PORT}`);
});