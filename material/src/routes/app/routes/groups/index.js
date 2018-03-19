module.exports = {
  path: 'groups',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Groups'));
    });
  }
};
