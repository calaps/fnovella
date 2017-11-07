module.exports = {
  path: 'create_group',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Create_group'));
    });
  }
};
