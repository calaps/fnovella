module.exports = {
  path: 'centered',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Centered'));
    });
  }
};
