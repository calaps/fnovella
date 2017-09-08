module.exports = {
  path: 'pie',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Pie'));
    });
  }
};
