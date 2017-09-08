module.exports = {
  path: 'icons',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Icons'));
    });
  }
};
