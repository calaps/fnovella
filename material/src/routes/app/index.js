module.exports = {
  path: 'app',
  onEnter: (nextState, replace) => {
    console.log("-*-*-*-*-*-*-*-* CHECKING USER FROM APP *-*-*-*-*-*-*-*-");
  },
  indexRoute: { onEnter: (nextState, replace) => {
    console.log("called on enter");
  }},
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/dashboard'), // main app dashboard
        require('./routes/forms'), //  sample forms
        require('./routes/pageLayouts'), // simple page Layout
        require('./routes/pages'), // App core pages
        require('./routes/catalog'), // Calaps App catalog
        require('./routes/users'), // Calaps App Users
        require('./routes/program'), // Calaps App Program
        require('./routes/students'), // Calaps App Students
        require('./routes/teachers'), // Calaps App Students
      ]);
    });
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/MainApp'));
    });
  }
};
