module.exports = {
  path: 'evaluation',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Evaluation'));
    });
  }
};
