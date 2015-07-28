/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

var UserItem    = require('./user-item').View;
var UserState   = require('./user-state'); 
var ChatBox     = require('./chat-box').View;

module.exports = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function(){
    return {
      userlist : [], 
      receiver : null
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
  openChatBox: function(sender,receiver){
    console.log("receiver ",receiver);
      this.setState({
        receiver: receiver,
        messages: []
      });
  },
  sendMesg: function(){
    var text   = this.refs.message.getDOMNode().value.trim();
  },
  render:function(){
    var self     = this;
    var users    = this.state.userlist;
    var sender   = self.getParams().username;
    var receiver = this.state.receiver;

    var ShowChatBox  = <div />
    if(receiver){
      ShowChatBox = <ChatBox sender={sender} receiver={receiver} />
    }
    return(
      <div className="container">
        <div className="user-list col-md-4" >
          <div className="logout-btn">
            <button onClick={self.onLogout}>logout</button>
          </div>
            <ul>
              {
                users.map(function(user){
                  return <UserItem receiver={user} sender={sender} openChatBox={self.openChatBox} />
                })
              }
            </ul>
        </div>
        <div className="user-chat col-md-8">
          {ShowChatBox}
        </div>
      </div>
    );
  }
});