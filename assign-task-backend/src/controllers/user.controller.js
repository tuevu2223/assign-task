import User from "../models/user.model.js";

/**
 * Get all users
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
