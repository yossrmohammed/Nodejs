const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./Routes/todos');
const userRouter = require('./Routes/users');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/iti_44');
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/todos', todoRouter);
app.use('/users', userRouter);
app.use((error, req, res) => res.status(error.status).json({ error: error.message }));
app.listen(PORT);
