/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');
var UserState   = require('./user-state');
module.exports = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function(){
    return {
      userlist : []
    }
  },
  componentDidMount: function(){
    var self   = this;
    var socket = io();
    var users = self.state.userlist;
    
    socket.on('loggedin_user',function(users){
      users = users;
      if(self.isMounted()){
        self.setState({
          userlist: users
        })
      }
    });
  },
  gotoChat: function(e){
    var username = this.refs.username.getDOMNode().value.trim();
    if(e.keyCode === 13 && username){
      if(this.state.userlist.indexOf(username)<0){
        UserState.Actions.login(username);
        this.transitionTo('dashboard',{username: username});
      }else{
        alert("name already used");
      }
    }
  },
  render:function(){
    var self = this;
    return(
      <div className="form login">
        <h3 className="title">What is your nickname?</h3>
        <input onKeyUp={self.gotoChat} className="usernameInput" ref="username" type="text" />
      </div>
    );
  }
});