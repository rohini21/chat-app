/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

var UserItem    = require('./user-item').View;
var UserState   = require('./user-state'); 

module.exports = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function(){
    return {
      userlist : []
    }
  },
  componentDidMount: function(){
    var self   = this;
    var socket = io();
    var users = self.state.userlist;
    console.log("initial userlist",users);
    socket.on('chat_mesg',function(msg){
      $('#chats').append($('<li>').text(msg.username + ": " + msg.message));
    }); 
    socket.on('loggedin_user',function(users){
      users = users.filter(function(user){
        return user !== self.getParams().username;
      });
      if(self.isMounted()){
        self.setState({
          userlist: users
        })
      }
    });
  },
  onLogout: function(){
    var self = this;
    UserState.Actions.logout(self.getParams().username);
    this.transitionTo('login');
  },
  render:function(){
    var self  = this;
    var users = this.state.userlist;

    console.log(users);
    return(
      <div>
        <div className="user-list">
          {
            users.map(function(user){
              return <UserItem username={user}/>
            })
          }
        </div>
        <div className="logout-btn">
          <button onClick={self.onLogout}>logout</button>
        </div>
      </div>
    );
  }
});