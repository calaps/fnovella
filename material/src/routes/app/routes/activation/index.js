module.exports = {
  path: 'activation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Activation'));
    });
  }
};
