module.exports = {
  path: 'menus',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Menus'));
    });
  }
};
