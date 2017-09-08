module.exports = {
  path: 'colors',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Colors'));
    });
  }
};
