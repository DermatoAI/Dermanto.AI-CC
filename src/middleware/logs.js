const logger = (req, res, next) => {
  console.log(`menerima respon dari ${ req.path }`);
  next();
};

module.exports = { logger };