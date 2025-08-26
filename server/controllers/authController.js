const bcrypt = require('bcrypt');
const { UserModel } = require('../models/schema');

// Login 
const login = async (req, res) => {
  const { name, password } = req.body;
  console.log(`Login attempt: name=${name}, password=${password}`);
  try {
    const user = await UserModel.findOne({ name });
    console.log('User found:', user);
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ id: user._id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register 
const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received Signup Data:", req.body);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, register };
