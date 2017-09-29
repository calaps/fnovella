module.exports = {
  path: 'teachers',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Teachers'));
    });
  }
};
