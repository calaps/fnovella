module.exports = {
  path: 'steppers',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Steppers'));
    });
  }
};
