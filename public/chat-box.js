/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

var ChatItem    = require('./chat-item').View;

module.exports.View = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function(){
    return {
      messages: []
    }
  },
  componentDidMount: function(){
    var self   = this;
    var socket = io();
    var messages   = self.state.messages; // next problem have to get blank mesg string in first component mount

    socket.on('chat_mesg',function(user){
      var obj = {
        'username': user.username,
        'text': user.message
      };
      messages.push(obj);
      self.setState({
        messages: messages
      })
    }); 
  },
  onSend: function(e){
    e.preventDefault();
    var self     = this;
    var socket   = io();
    var messages = self.state.messages;

    var text   = this.refs.message.getDOMNode().value.trim();
    if((e.keyCode === 13 || e.type === 'click') && text){
      socket.emit('chat_mesg',{'username':this.props.sender,
        'receiver':self.props.receiver,
        'message': text
      });
      var obj = {
        'username': self.getParams().username,
        'text': text
      };
      messages.push(obj);
      self.setState({
        messages: messages
      });

      this.refs.message.getDOMNode().value = '';
    }
  },
  render:function(){
    var self     = this;
    var receiver = this.props.receiver;
    var sender   = this.props.sender;
    var messages = this.state.messages;

    return(
      <div className="chat-box container">
        <div className="cb-content">
          <ul>
            {
              messages.map(function(message){
                return <ChatItem message={message} />
              })
            }
          </ul>
        </div>
        <div className="form cb-input ">
          <form>
            <input ref="message" type="text" onKeyUp={self.onSend} /><button onClick={self.onSend}>Send</button>
          </form>
        </div>
      </div>
    );
  }
});