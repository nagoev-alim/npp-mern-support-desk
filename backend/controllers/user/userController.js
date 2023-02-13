const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

/**
 * @desc Register User
 * @route /api/users
 * @access public
 */
const registerUser = asyncHandler(
  async ({ body: { name, email, password } }, res) => {

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please include all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw  new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (user) {
      res
        .status(201)
        .json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }

    return res.send('Register Route');
  });

/**
 * @desc Login User
 * @route /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  return res.send('Login Route');
});

module.exports = {
  registerUser,
  loginUser,
};
