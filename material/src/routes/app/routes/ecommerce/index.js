module.exports = {
  path: 'ecommerce',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/horizontalProducts'),
        require('./routes/products'),
        require('./routes/invoice'),
      ]);
    });
  }
};
