module.exports = {
  path: 'page',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/about'),
        require('./routes/profile'),
        require('./routes/blog'),
        require('./routes/careers'),
        require('./routes/contact'),
        require('./routes/faqs'),
        require('./routes/services'),
        require('./routes/terms'),
      ]);
    });
  }
};
