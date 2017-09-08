module.exports = {
  path: 'users',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Users'));
    });
  }
};
