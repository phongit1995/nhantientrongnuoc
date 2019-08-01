var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Bank = new Schema({
    Abbreviations:String,
    NameBank:String
})
module.exports = mongoose.model("Bank",Bank);