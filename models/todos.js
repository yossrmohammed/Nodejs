const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: [10, 'Title  must be at least 10 characters long'],
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'done'],
    default: 'to-do',
  },
  tags: {
    type: [String],

  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },

});
const Todos = mongoose.model('Todos', todosSchema);
module.exports = Todos;
