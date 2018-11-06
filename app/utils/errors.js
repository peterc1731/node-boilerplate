const { buildValidationResponse } = require('./validation');

const handleErrors = (err, req, res, next) => {
  if (err.name && err.name === 'ValidationError') {
    return res.status(422).json({
      message: 'There was an issue with your request',
      errors: buildValidationResponse(err.errors),
    });
  }

  // Authentication errors
  if (err.name === 'UserExistsError') {
    return res.status(422).json({
      message: 'There was an issue with your request',
      errors: {
        email: {
          message: 'Email already in use',
        },
      },
    });
  } if (err.name === 'MissingUsernameError') {
    return res.status(422).json({
      message: 'There was an issue with your request',
      errors: {
        email: {
          message: 'Email is required',
        },
      },
    });
  } if (err.name === 'MissingPasswordError') {
    return res.status(422).json({
      message: 'There was an issue with your request',
      errors: {
        password: {
          message: 'Password is required',
        },
      },
    });
  }

  if (err instanceof Error) {
    return res.status(422).json({
      message: 'There was an issue with your request',
      error: err.message,
    });
  }

  res.status(500).json({
    message: 'An error occurred 😲',
    error: err,
  });

  return next(err);
};

module.exports = {
  handleErrors,
};
