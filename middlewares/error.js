// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.code && typeof err.code === 'string') {
      res.status(500).send({
        error: {
          status: 500,
          message: err.message,
        },
      });
    } else {
      res.status(err.status || err.code || 500).send({
        error: {
          status: err.status || err.code,
          message: err.message,
        },
      });
    }
  }
};

module.exports = {
  errorHandler,
};
