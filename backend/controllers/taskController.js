const Task = require("../models/Task");

async function getTasks(req, res) {
  const { id } = req.user;

  try {
    const task = await Task.find({ user: id });
    res.status(200).json(task);
  } catch (error) {
    console.log("get all task error:", error.message);
    res.status(500).json({ error: "unexpected error occur" });
  }
}

async function createTask(req, res) {
  const { id } = req.user;
  const { title, description, status, dueDate } = req.body;

  if (!title) return res.status(400).json({ error: "title required" });
  if (dueDate && isNaN(new Date(dueDate).getTime()))
    return res.status(400).json({ error: "invalid date" });

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
    console.log("create task error:", error.message);
    res.status(500).json({ error: "unexpected error occur" });
  }
}

async function updateTask(req, res) {
  const { id } = req.user;
  const { title, description, status, dueDate } = req.body;
  const { taskId } = req.params;

  let task;
  try {
    task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "task not found" });
  } catch (error) {
    return res.status(400).json({ error: "invalid task id" });
  }

  try {
    const belongsToUser = task.user.equals(id);
    if (!belongsToUser)
      return res.status(403).json({ error: "forbidden request" });

    const { _id } = task;
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        status,
        dueDate,
      },
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("update task error:", error.message);
    res.status(500).json({ error: "unexpected error occur" });
  }
}

async function deleteTask(req, res) {
  const { taskId } = req.params;
  const { id } = req.user;

  let task;
  try {
    task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "task not found" });
  } catch (error) {
    return res.status(400).json({ error: "invalid task id" });
  }

  const belongsToUser = task.user.equals(id);
  if (!belongsToUser)
    return res.status(403).json({ error: "forbidden request" });

  try {
    const { _id } = task;
    const deletedTask = await Task.findByIdAndDelete(_id);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.log("delete task error:", error.message);
    res.status(500).json({ error: "unexpected error occur" });
  }
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
