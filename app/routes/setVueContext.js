module.exports = (req, res, next) => {
  res.locals.context = {
    title: 'Test',
    url: req.url,
    cookies: req.cookies,
    user: {},
    state: {},
  };

  next();
};
