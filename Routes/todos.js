const router = require('express').Router();
const todoController = require('../controller/todos');
const CustomError = require('../errors/customError');
const validator = require('../middlewares/todos');
const auth = require('../middlewares/auth');

router.get('/', auth.auth, async (req, res, next) => {
  const id = req.userId;
  // eslint-disable-next-line prefer-const
  let [err, todos] = await todoController.getAll(id);
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  if (!todos) {
    return next(new CustomError('Todo not found', 404));
  }
  return res.json(todos);
});
router.get('/:id', auth.auth, async (req, res, next) => {
  const { id } = req.params;
  const [err, todo] = await todoController.getOne(id);
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  if (!todo) {
    return next(new CustomError('Todo not found', 404));
  }
  return res.json(todo);
});
router.post('/', validator.checkBody, auth.auth, async (req, res, next) => {
  const newTodo = req.body;
  const { userId } = req;
  const [err, todo] = await todoController.addOne(newTodo, userId);
  if (!err) {
    return res.json(todo);
  }
  return next(new CustomError(err, 400));
});
router.patch('/:id', validator.checkBody, async (req, res, next) => {
  const todo = req.body;
  const { id } = req.params;
  const [err, updatedTodo] = await todoController.editOne(id, todo);
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  return res.sendStatus(200);
});
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const [err, deletedTodo] = await todoController.deleteOne(id).exec();
  if (err) {
    return next(new CustomError(err.message, 400));
  }
  return res.sendStatus(200);
});
module.exports = router;
