import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  res.json(req.user);
};

export const updateMyProfile = async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name ?? user.name;
  user.phone = phone ?? user.phone;
  await user.save();

  res.json({
    message: "Profile updated",
    user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
  });
};