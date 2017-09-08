module.exports = {
  path: 'products',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Products'));
    });
  }
};
