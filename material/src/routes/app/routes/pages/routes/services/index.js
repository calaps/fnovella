module.exports = {
  path: 'services',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Services'));
    });
  }
};
