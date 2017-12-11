module.exports = {
    path: 'inscription_participant',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Inscription_participant'));
      });
    }
  };
  