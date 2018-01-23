module.exports = {
  path: 'indicators',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/fundation'),
        require('./routes/program'),
        require('./routes/group'),
      ]);
    });
  }
};
