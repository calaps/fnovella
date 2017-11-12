module.exports = {
  path: 'visualization',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/programs'),
      ]);
    });
  }
};
