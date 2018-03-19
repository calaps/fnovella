module.exports = {
    path: 'program',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Program'));
      });
    }
  };

