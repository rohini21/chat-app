/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

module.exports.View = React.createClass({
  mixins: [Router.Navigation, Router.State],
  openChatBox: function(){
    this.props.openChatBox(this.props.sender,this.props.receiver);
  },
  render:function(){
    var self     = this;
    var username = this.props.receiver;
    return(
      <li onClick={self.openChatBox}>
        {username}
      </li>
    );
  }
});