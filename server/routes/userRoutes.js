const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUserDetails,
  updateUserProfile
} = require('../controllers/userController');


router.get('/getuser/:id', getUser);
router.put('/user-details/:id', updateUserDetails);
router.put('/updateuser/:id', updateUserProfile);

module.exports = router;
