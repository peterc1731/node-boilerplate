const mongoose = require('mongoose');

/**
 * Is the email a valid email
 * @param {string} email The email
 */
const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Check if the value is unique
 * @param {string} value The value you're checking against
 * @param {mongoose.model} model the model you want to use
 * @param {string} key The key you're checking against in the model
 */
const isUnique = async (value, model = mongoose.model('User'), key = 'email') => {
  try {
    const query = {};
    query[key] = value;
    const exists = await model.find(query).countDocuments();
    return exists === 0;
  } catch (err) {
    return new Error(err);
  }
};

/**
 * Check if a string contains another string
 * @param {string} needle The item you're looking for
 * @param {string} haystack The full string
 */
const doesContain = (needle, haystack) => haystack.trim().includes(needle);

/**
 * Rebuilds the object into a nicer validation response
 * @param {object} errorObj The error object from express validation
 */
const buildValidationResponse = (errorObj) => {
  const errors = {};
  if (typeof errorObj !== 'object') {
    return new Error('You need to pass a valid express validation object');
  }

  Object.keys(errorObj).forEach((key) => {
    errors[key] = {
      message: errorObj[key].message,
      value: errorObj[key].value,
    };
  });

  return errors;
};

module.exports = {
  isEmail,
  isUnique,
  doesContain,
  buildValidationResponse,
};
