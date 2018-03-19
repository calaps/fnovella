module.exports = {
    path: 'inscription_approval',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Inscription_approval'));
      });
    }
  };

  