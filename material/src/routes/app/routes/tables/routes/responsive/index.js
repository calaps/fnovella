module.exports = {
  path: 'responsive',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/ResponsiveTables'));
    });
  }
};
