module.exports = {
  path: 'table',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/data'),
        require('./routes/responsive'),
        require('./routes/static'),
      ]);
    });
  }
};
