const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateUserProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.email = email !== undefined ? email : user.email;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getUserProfile, updateUserProfile };
