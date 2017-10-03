module.exports = {
  path: 'locations',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Locations'));
    });
  }
};
