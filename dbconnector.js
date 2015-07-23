var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chatapp')

exports.connectdb = function (){
	var db = mongoose.connection

	db.on('error', function (err) {
		console.error(err)
	})

	db.once('open', function (){
		console.log('mongodb in connected')	
	})
}