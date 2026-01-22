const Task = require("../models/Task");

async function getTasks(req, res, next) {
  const { id } = req.user;

  try {
    const task = await Task.find({ user: id });
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  const { id } = req.user;
  const { title, description, status, dueDate } = req.body;

  if (!title) {
    const error = new Error("Title required");
    error.statusCode = 400;
    throw error;
  }

  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    const error = new Error("Invalid date");
    error.statusCode = 400;
    throw error;
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  const { id } = req.user;
  const { title, description, status, dueDate } = req.body;
  const { id: taskId } = req.params;

  let task;

  try {
    task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }

  try {
    const belongsToUser = task.user.equals(id);

    if (!belongsToUser) {
      const error = new Error("Forbidden request");
      error.statusCode = 403;
      throw error;
    }

    const { _id } = task;

    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        status,
        dueDate,
      },
      { new: true },
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  const { id } = req.user;
  const { id: taskId } = req.params;

  let task;
  try {
    task = await Task.findById(taskId);

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }

  const belongsToUser = task.user.equals(id);

  if (!belongsToUser) {
    const error = new Error("Forbidden request");
    error.statusCode = 403;
    throw error;
  }

  try {
    const { _id } = task;
    const deletedTask = await Task.findByIdAndDelete(_id);

    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
