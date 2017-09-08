module.exports = {
  path: 'feature-callouts',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/FeatureCallouts'));
    });
  }
};
