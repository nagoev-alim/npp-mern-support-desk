const registerUser = (req, res) => {
  return res.send('Register Route');
};

const loginUser = (req, res) => {
  return res.send('Login Route');
};

module.exports = {
  registerUser,
  loginUser,
};
