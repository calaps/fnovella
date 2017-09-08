module.exports = {
  path: 'line',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Line'));
    });
  }
};
