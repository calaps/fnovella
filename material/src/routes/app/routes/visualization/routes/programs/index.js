module.exports = {
  path: 'programs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Programs'));
    });
  }
};
