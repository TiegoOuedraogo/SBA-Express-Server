// middleware/logger.js
function logger(req, res, next) {
    console.log(`${req.method} request at ${req.url} - ${new Date().toISOString()}`);
    next();
  }
  
  module.exports = logger;
  