const bcrypt = require('bcrypt');
const { UserModel } = require('../models/schema');

// Login 
const login = async (req, res) => {
  const { name, password } = req.body;
  console.log(`Login attempt: name=${name}`);

  try {
    const user = await UserModel.findOne({ name });
    console.log('User found:', user);

    if (user && await bcrypt.compare(password, user.password)) {
      // 🔹 Save session
      req.session.userId = user._id;
      req.session.name = user.name;
      req.session.email = user.email;

      res.status(200).json({ message: "Login successful" });
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

    // 🔹 Auto-login after signup (optional)
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.email = user.email;

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: err.message });
  }
};

// Logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // 🔹 default session cookie
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = { login, register, logout };
