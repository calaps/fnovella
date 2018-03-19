module.exports = {
    path: 'fundation',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Fundation'));
      });
    }
  };

