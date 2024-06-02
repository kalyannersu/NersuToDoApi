const Todo = require("../models/Todo");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const todo = new Todo({
      userId: req.user.userId,
      text,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed, onHold } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.text = text !== undefined ? text : todo.text;
    todo.completed = completed !== undefined ? completed : todo.completed;
    todo.onHold = onHold !== undefined ? onHold : todo.onHold;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
