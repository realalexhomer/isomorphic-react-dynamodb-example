var React = require('react');
var {DefaultRoute, NotFoundRoute, Route} = require('react-router');
var App = React.createFactory(require('./components/app.jsx'));

module.exports = [
  <Route path="/" handler={App}>
  </Route>
]