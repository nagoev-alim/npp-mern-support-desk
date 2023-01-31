const asyncHandler = require('express-async-handler');

/**
 * @desc Register User
 * @route /api/users
 * @access public
 */
const registerUser = asyncHandler(
  async ({ body: { name, email, password } }, res) => {
    console.log({ name, email, password });

    if (!name || !email || !password) {
      res
        .status(400)
        .json({
          message: 'Please include all fields',
        });
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
