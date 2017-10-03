module.exports = {
  path: 'workshop',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Workshop'));
    });
  }
};
