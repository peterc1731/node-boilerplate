const { registerUser, authenticate, getAccessToken } = require('../utils/authenticate');

const register = async (req, res, next) => {
  try {
    const userToRegister = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    };
    await registerUser(userToRegister);
    const authenticatedUser = await authenticate(userToRegister);
    const { user, token } = await getAccessToken(authenticatedUser);
    return res.status(200).json({
      message: 'Successfully created new account 👏',
      user,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const authenticatedUser = await authenticate({
      email: req.body.email,
      password: req.body.password,
    });
    const { user, token } = await getAccessToken(authenticatedUser);
    return res.status(200).json({
      message: 'Successfully logged in 🎉',
      user,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
};
