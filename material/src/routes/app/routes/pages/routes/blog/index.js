module.exports = {
  path: 'blog',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Blog'));
    });
  }
};
