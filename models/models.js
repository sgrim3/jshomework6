var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	twotes: [{ type: Schema.ObjectId, ref: 'User' }]
});

var TwoteSchema = new Schema({
    // username : { type: Schema.ObjectId, ref: 'Twote' },
    username: String,
	content: String,
	time : { type : Date, default: Date.now }
});


module.exports.user = mongoose.model("User", UserSchema);
module.exports.twote = mongoose.model("Twote", TwoteSchema);
