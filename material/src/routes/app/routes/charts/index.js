module.exports = {
  path: 'chart',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/bar'),
        require('./routes/funnel'),
        require('./routes/line'),
        require('./routes/more'),
        require('./routes/pie'),
        require('./routes/radar'),
        require('./routes/scatter'),
      ]);
    });
  }
};
