module.exports = {
  path: 'catalog',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Catalog'));
    });
  }
};
