module.exports = {
  path: 'category',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Category'));
    });
  }
};
