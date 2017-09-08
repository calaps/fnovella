module.exports = {
  path: 'hover',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Hover'));
    });
  }
};
