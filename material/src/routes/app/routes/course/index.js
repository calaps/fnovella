module.exports = {
  path: 'course',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Course'));
    });
  }
};
