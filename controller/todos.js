const todosModel = require('../models/todos');
const asyncWrapper = require('../lib/async-wrapper');

const getAll = async (userId) => {
  const todos = await asyncWrapper(todosModel.find({ userId }).exec());
  return todos;
};
const getOne = async (id) => {
  const todo = await asyncWrapper(todosModel.findById(id).exec());
  return todo;
};
const addOne = async (todo, userId) => {
  todo.userId = userId;
  const newTodo = await asyncWrapper(todosModel.create(todo));
  return newTodo;
};
const deleteOne = async (id) => {
  const todo = await asyncWrapper(todosModel.findByIdAndDelete(id));
  return todo;
};
const editOne = async (id, todo) => {
  const updatedTodo = await asyncWrapper(todosModel.findByIdAndUpdate(id, todo));
  return updatedTodo;
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  editOne,

};
