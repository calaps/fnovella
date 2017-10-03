module.exports = {
  path: 'grade',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Grade'));
    });
  }
};
