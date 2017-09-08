module.exports = {
  path: 'fullscreen',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Fullscreen'));
    });
  }
};
