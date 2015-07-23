/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

module.exports.View = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function(){
    return{
      showBox: 'showBox'
    }
  },
  componentDidMount: function(){
    var self   = this;
    var socket = io();
    socket.on('chat_mesg',function(user){
      $('#chats').append($('<li>').text(user.username + ":  " + user.message));
    }); 
  },
  onSend: function(e){
    e.preventDefault();
    var self   = this;
    var socket = io();
    var text   = this.refs.message.getDOMNode().value.trim();
    if((e.keyCode === 13 || e.type === 'click') && text){
      socket.emit('chat_mesg',{'username':self.getParams().username,
        'receiver':self.props.username,
        'message': text
      });
      $('#chats').append($('<li>').text(self.getParams().username + ":  " + text));
      this.refs.message.getDOMNode().value = '';
    }
  },
  startChat: function(){
    this.setState({
      showBox: ''
    })
  },
  render:function(){
    var self     = this;
    var username = this.props.username;
    var showBox  = this.state.showBox;
    return(
      <li>
        <div className={"form chat "+showBox}>
          <ul id="chats" ref="chat"></ul>
          <form>
            <input ref="message" type="text" onKeyUp={self.onSend} /><button onClick={self.onSend}>Send</button>
          </form>
        </div>
        <div onClick={self.startChat}>
          {username}
        </div>
      </li>
    );
  }
});