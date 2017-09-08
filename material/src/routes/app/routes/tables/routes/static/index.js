module.exports = {
  path: 'static',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/StaticTables'));
    });
  }
};
