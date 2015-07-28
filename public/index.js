/* @jsx React.DOM */

$ = jQuery = require('jquery');
require('./css/style.css');
require('./lib/bootstrap.min.js');
require('./css/lib/bootstrap.min.css');

var React           = require('react');
var Router          = require('react-router');
var Route           = Router.Route;
var Routes          = Router.Routes;
var Redirect        = Router.Redirect;
var DefaultRoute    = Router.DefaultRoute;
var NotFoundRoute   = Router.NotFoundRoute;

var App       = require('./app');
var Login     = require('./login');
var Dashboard = require('./dashboard');

var routes = 
  (
    <Route name="app" path="/" handler={App} >
    	<Route name="login" path="/login" handler={Login} />
      <Route name="dashboard" path="/dashboard/:username" handler={Dashboard} />
      <DefaultRoute handler={Login} />
    </Route>
  );

Router.run(routes, function (Handler, state) {
  React.render(<Handler params={state.params} />, document.body);
});
