module.exports = {
  path: 'root',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./AppRoot'));
    });
  }
};
