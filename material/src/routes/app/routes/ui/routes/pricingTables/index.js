module.exports = {
  path: 'pricing-tables',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/PricingTables'));
    });
  }
};
