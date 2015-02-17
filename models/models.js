var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	twotes: [{ type: Schema.ObjectId, ref: 'Twote' }]
});

var TwoteSchema = new Schema({
    username : { type: Schema.ObjectId, ref: 'User' },
    // username: String,
	content: String,
	notDeletable: Boolean,
	time : { type : Date, default: Date.now }
});


module.exports.user = mongoose.model("User", UserSchema);
module.exports.twote = mongoose.model("Twote", TwoteSchema);
