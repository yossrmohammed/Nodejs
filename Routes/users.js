const router = require('express').Router();
const jsonWebToken = require('jsonwebtoken');
const userController = require('../controller/user');
const validator = require('../middlewares/todos');
const asyncWrapper = require('../lib/async-wrapper');
const CustomError = require('../errors/customError');
const usersModel = require('../models/users');

router.get('/', async (req, res) => {
  const users = await userController.getAll();
  console.log(users);
  res.json(users);
});
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const [err, user] = await userController.getOne(id);
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  return res.json(user);
});
router.get('/:id/todos', async (req, res, next) => {
  const { id } = req.params;
  const [err, todo] = await userController.userTodos(id);
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  return res.json(todo);
});
router.post('/', validator.checkBody, async (req, res, next) => {
  const user = req.body;
  const [err, newUser] = await userController.addOne(user);
  if (err) {
    return next(new CustomError(err, 400));
  }
  return res.sendStatus(201).json(newUser);
});
router.patch('/:id', validator.checkBody, async (req, res, next) => {
  const user = req.body;
  const { id } = req.params;
  const [err, newUser] = await userController.editOne(id, user);
  if (err) {
    return next(new CustomError(err, 400));
  }
  return res.sendStatus(200).json(newUser);
});
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const [err, user] = await userController.deleteOne(id);
  if (err) {
    return next(new CustomError(err, 400));
  }
  return res.sendStatus(200);
});
router.post('/login', async (req, res, next) => {
  const { userName, password } = req.body;
  const [err, user] = await asyncWrapper(usersModel.findOne({ userName }).exec());
  if (err) {
    return next(new CustomError('unautharized', 401));
  }
  const valid = await user.verifyPassword(password);
  if (!valid) {
    return next(new CustomError('unautharized', 401));
  }
  // eslint-disable-next-line no-underscore-dangle
  const token = jsonWebToken.sign({ userName, id: user._id }, 'asdfghjkl1qwedfvgb', { expiresIn: '1d' });
  return res.json(token);
});
module.exports = router;
