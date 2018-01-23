module.exports = {
    path: 'search',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Search'));
      });
    }
  };

