const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const passport = require('./utils/passport');
const logger = require('./utils/logger');
const routes = require('./routes/v1/routes');
const db = require('./utils/db');
const { handleErrors } = require('./utils/errors');

const app = express();

module.exports = (isTest = false) => {
  app.use(cors());
  app.use(compression());
  app.use(passport.initialize());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Read Version 1 Routes
  routes(app);

  app.get('*', (req, res) => res.status(404).json({
    message: "Seems like the endpoint you're looking for no longer exists 🤔",
  }));

  app.use(handleErrors);

  app.use((err, req, res, next) => {
    if (err) {
      logger('There was an error 😲', 'error', err.stack);
      throw err;
    }

    next();
  });

  if (!isTest) {
    app.use(morgan('common'));
    db.connect();

    app.listen(config.port, () => {
      logger(`App listening on port ${config.port}`, 'info');
    });
  }

  return app;
};
