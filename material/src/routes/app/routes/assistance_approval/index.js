module.exports = {
    path: 'assistance_approval',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Assistance_approval'));
      });
    }
  };
