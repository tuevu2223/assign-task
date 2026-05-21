import Task from "../models/task.model.js";

/**
 * Build query based on role and filters
 */
const buildQuery = (req) => {
  const { status, priority, assignedTo, search } = req.query;
  const user = req.user;
  let query = {};

  // Role-based filtering
  if (user.role === "MANAGER") {
    query.createdBy = user._id;
  } else if (user.role === "USER") {
    query.assignedTo = user._id;
  }
  // ADMIN can see all, so no base role query needed

  // Query parameter filtering
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;

  // Search by title
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  return query;
};

export const getTasks = async (req, res, next) => {
  try {
    const query = buildQuery(req);
    const tasks = await Task.find(query)
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { status, priority, search } = req.query;
    let query = { assignedTo: userId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query)
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};


export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("createdBy", "fullName email")
      .populate("assignedTo", "fullName email");

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Role check
    if (
      req.user.role === "MANAGER" &&
      task.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (
      req.user.role === "USER" &&
      task.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, assignedTo } = req.body;

    let task = await Task.create({
      title,
      description,
      status,
      priority,
      assignedTo,
      createdBy: req.user._id,
    });

    // Populate for a better response
    task = await task.populate([
      { path: "createdBy", select: "fullName email" },
      { path: "assignedTo", select: "fullName email" }
    ]);

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Role check
    if (
      req.user.role === "MANAGER" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Role check
    if (
      req.user.role === "MANAGER" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await task.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // USER can only update their own tasks
    if (
      req.user.role === "USER" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    // MANAGER can only update tasks they created
    if (
      req.user.role === "MANAGER" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    task.status = req.body.status;
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const updateMyTaskStatus = async (req, res, next) => {
  try {
    const { taskId, status } = req.body;
    const userId = req.user._id;

    let task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Verify the task is assigned to the authenticated user
    if (task.assignedTo.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden: You can only update status of your own tasks" });
    }

    task.status = status;
    await task.save();

    // Populate for response consistency
    task = await task.populate([
      { path: "createdBy", select: "fullName email" },
      { path: "assignedTo", select: "fullName email" }
    ]);

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

export const assignTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Role check
    if (
      req.user.role === "MANAGER" &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    task.assignedTo = req.body.assignedTo;
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};
