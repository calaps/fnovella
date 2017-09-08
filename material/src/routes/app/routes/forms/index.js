module.exports = {
  path: 'form',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/components'),
        require('./routes/layouts'),
        require('./routes/steppers'),
      ]);
    });
  }
};
