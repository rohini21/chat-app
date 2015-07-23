/** @jsx React.DOM */
var React       = require('react/addons');
var Router      = require('react-router');
var Reflux      = require('reflux');

var Actions = module.exports.Actions = Reflux.createActions([
  'login',
  'logout'
]);

module.exports.Store = Reflux.createStore({
	mixins: [Router.Navigation],
  init: function() {
		this.socket = io();
    var self  = this;
    self.listenToMany(Actions);
  },
  onLogin: function(username){
  	this.socket.emit('login',username);
  },
  onLogout: function(username){
  	this.socket.emit('logout',username);
  }  
})