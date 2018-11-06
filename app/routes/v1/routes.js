const auth = require('./auth');
const health = require('./health');
const index = require('./index');
const user = require('./user');

module.exports = (app) => {
  auth(app);
  health(app);
  index(app);
  user(app);
};
