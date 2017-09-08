module.exports = {
  path: 'icon-boxes',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/IconBoxes'));
    });
  }
};
