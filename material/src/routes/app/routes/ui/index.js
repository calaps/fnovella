module.exports = {
  path: 'ui',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/boxes'),
        require('./routes/buttons'),
        require('./routes/callToActions'),
        require('./routes/cards'),
        require('./routes/colors'),
        require('./routes/components'),
        require('./routes/featureCallouts'),
        require('./routes/grids'),
        require('./routes/hover'),
        require('./routes/iconBoxes'),
        require('./routes/icons'),
        require('./routes/lists'),
        require('./routes/menus'),
        require('./routes/pricingTables'),
        require('./routes/sashes'),
        require('./routes/testimonials'),
        require('./routes/timeline'),
        require('./routes/typography'),
      ]);
    });
  }
};
