module.exports = {
  path: 'invoice',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Invoice'));
    });
  }
};
