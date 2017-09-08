module.exports = {
  path: 'careers',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Careers'));
    });
  }
};
