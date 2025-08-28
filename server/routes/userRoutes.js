const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUserDetails,
  updateUserProfile
} = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.get('/getuser/:id', authMiddleware, getUser);
router.put('/user-details/:id', authMiddleware, updateUserDetails);
router.put('/updateuser/:id', authMiddleware, updateUserProfile);


module.exports = router;
