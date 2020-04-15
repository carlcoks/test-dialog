module.exports = (req, res, next) => {
  switch (req.path) {
    case '/login':
    case '/logout':
    default:
      next();
  }
};
