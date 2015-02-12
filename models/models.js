var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NameSchema = new Schema({
	attribute1: String,
	attribute2: Number,
	attribute3Ref: [{ type: Schema.ObjectId, ref: 'Ingredient' }]
});

var Name2Schema = new Schema({
    _creator : { type: Schema.ObjectId, ref: 'Order' },
    attribute4: String,
	attribute5: Number,
	attribute6: Boolean
});


module.exports.order = mongoose.model("Name", NameSchema);
module.exports.ingredient = mongoose.model("Name2", Name2Schema);
