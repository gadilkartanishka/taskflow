const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.get("/:projectId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Task title is required"),
    body("projectId").notEmpty().withMessage("Project ID is required"),
    body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, dueDate, projectId } = req.body;
    try {
      const task = new Task({
        title,
        dueDate,
        project: projectId,
        user: req.user.id,
      });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.patch("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    task.status = task.status === "complete" ? "incomplete" : "complete";
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
