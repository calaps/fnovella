module.exports = {
  path: 'layouts',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Layouts'));
    });
  }
};
