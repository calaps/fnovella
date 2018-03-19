module.exports = {
    path: 'group',
    getComponent(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/Group'));
      });
    }
  };

