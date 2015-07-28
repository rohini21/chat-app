/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

module.exports.View = React.createClass({
  mixins: [Router.Navigation, Router.State],
  render:function(){
    var self     = this;
    var message  = this.props.message;
    return(
      <li>{message.username}: {message.text}</li>
    );
  }
});