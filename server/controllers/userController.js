const { UserModel } = require('../models/schema');

// Get user by ID
const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user fitness details
const updateUserDetails = async (req, res) => {
  const { weight, height, age, sex, goal, hypertension, diabetes } = req.body;
  const { id } = req.params;

  try {
    const existingUser = await UserModel.findById(id);
    if (existingUser) {
      existingUser.weight = weight;
      existingUser.height = height;
      existingUser.age = age;
      existingUser.sex = sex;
      existingUser.goal = goal;
      existingUser.hypertension = hypertension;
      existingUser.diabetes = diabetes;

      await existingUser.save();
      res.status(200).json({ message: "User details updated successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in updateUserDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update name/email (profile)
const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      $or: [{ name }, { email }],
      _id: { $ne: id }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      } else if (existingUser.name === name) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUserDetails,
  updateUserProfile
};
