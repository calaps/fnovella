module.exports = {
    path: 'inscription',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/inscription'));
      });
    }
  };
  