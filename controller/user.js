const usersModel = require('../models/users');
const todosModel = require('../models/todos');
const asyncWrapper = require('../lib/async-wrapper');

const getAll = async () => {
  const users = await asyncWrapper(usersModel.find({}).exec());
  return users;
};
const getOne = async (id) => {
  const user = await asyncWrapper(usersModel.findById(id));
  return user;
};
const addOne = async (user) => {
  const newUser = await asyncWrapper(usersModel.create(user));
  return newUser;
};
const deleteOne = async (id) => {
  await usersModel.findByIdAndDelete(id).exec();
};
const editOne = async (id, user) => {
  const newUser = await asyncWrapper(usersModel.findByIdAndUpdate(id, user).exec());
  return newUser;
};
const userTodos = async (userId) => {
  const todos = await asyncWrapper(todosModel.find({ userId }).populate({
    path: 'userId',
    select: 'userName -_id',
  }).exec());
  return todos;
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  editOne,
  userTodos,

};
