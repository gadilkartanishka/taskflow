const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/",
  auth,
  [
    body("title").trim().notEmpty().withMessage("Project title is required"),
    body("description").optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { title, description } = req.body;
    try {
      const project = new Project({ title, description, user: req.user.id });
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await project.deleteOne();
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
