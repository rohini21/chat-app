/** @jsx React.DOM */
var React        = require('react/addons');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.Navigation],
  
  render:function(){
    return(
      <div>
      	<RouteHandler params={this.props.params} query={this.props.query} />
      </div>
    );
  }
});