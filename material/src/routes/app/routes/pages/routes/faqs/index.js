module.exports = {
  path: 'faqs',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/FAQs'));
    });
  }
};
