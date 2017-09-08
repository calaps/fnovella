module.exports = {
  path: 'app',
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dashboard'), // main app dashboard
        require('./routes/forms'), //  sample forms
        require('./routes/pageLayouts'), // simple page Layout
        require('./routes/pages'), // App core pages
        require('./routes/catalog'), // App catalog
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
