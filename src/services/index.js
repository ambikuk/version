const version = require('./version/version.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = (app) => {
  app.configure(version);
};
