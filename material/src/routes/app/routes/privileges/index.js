module.exports = {
  path: 'privileges',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Privileges'));
    });
  }
};
