module.exports = {
  path: 'section',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Section'));
    });
  }
};
