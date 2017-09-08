module.exports = {
  path: 'sashes',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Sashes'));
    });
  }
};
