module.exports = {
  path: 'division',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Division'));
    });
  }
};
