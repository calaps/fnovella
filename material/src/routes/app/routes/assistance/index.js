module.exports = {
    path: 'assistance',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Assistance'));
      });
    }
  };
