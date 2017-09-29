module.exports = {
  path: 'students',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Students'));
    });
  }
};
