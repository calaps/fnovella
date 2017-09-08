module.exports = {
  path: 'call-to-actions',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/CallToActions'));
    });
  }
};
