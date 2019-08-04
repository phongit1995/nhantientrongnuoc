var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require("../models/User");
var Info = require("../models/InFo");
var moment = require('moment-timezone');
var Bank = require("../models/Bank");

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render("admin/dashboard");
  }
  else{
    res.redirect("/admin/dang-nhap");
  }
  
});
router.get("/dang-nhap",(req,res)=>{
    res.render("admin/login");
})
router.get("/khach-hang",(req,res)=>{
  if(req.isAuthenticated()){
    Info.find({isView:false}).sort({'Createat':-1}).exec((erro,data)=>{
      res.render("admin/quanlykhachhang",{datas:data,moment: moment});
    })
    
  }
  else{
    res.redirect("/admin/dang-nhap");
  }
})
router.get("/khach-hang/hide/:id",(req,res)=>{
  if(req.isAuthenticated()){
    Info.updateOne({_id:req.params.id},{isView:true}, {upsert: true},(erro,data)=>{
      res.redirect("/admin/khach-hang")
    })
    
  }
  else{
    res.redirect("/admin/dang-nhap");
  }

 
})
router.get("/khach-hang/xoa/:id",(req,res)=>{
  if(req.isAuthenticated()){
    Info.findOneAndDelete({_id:req.params.id},(erro,data)=>{
      res.redirect("/admin/da-xem");
    })
    
  }
  else{
    res.redirect("/admin/dang-nhap");
  }

 
})
router.get("/da-xem",(req,res)=>{
  if(req.isAuthenticated()){
    
    Info.find({isView:true}).sort({'Createat':-1}).exec((erro,data)=>{
      res.render("admin/danhsachdaxem",{datas:data,moment: moment});
    })
  }
  else{
    res.redirect("/admin/dang-nhap");
  }
})
router.get("/ngan-hang",(req,res)=>{
  if(req.isAuthenticated()){
      Bank.find({},(erro,banks)=>{
        res.render("admin/danhsachnganhang",{banks});
      })
  }
  else{
    res.redirect("/admin/dang-nhap");
  }

 
})
// LogOut
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/admin');
})
router.get("/xoa-ngan-hang/:id",(req,res)=>{
  if(req.isAuthenticated()){
      Bank.findOneAndDelete({_id:req.params.id},(erro,data)=>{
          res.redirect("/admin/ngan-hang")
      })
}
else{
  var obj={
    status:"erro",
    message:"Vui Lòng Đăng Nhập"
    }
    res.json(obj);
  }
})
router.post("/them-ngan-hang",(req,res)=>{
  
    if(req.isAuthenticated()){
      
      var obj={
        Abbreviations:req.body.name,
        NameBank:req.body.namenganhang
      }
      Bank.create(obj,(erro,data)=>{
        console.log(data);
        res.redirect("/admin/ngan-hang");
      })
    }
    else{
      res.redirect("/admin/dang-nhap");
    }
    
})
// router.get("/tao",(req,res)=>{
//   User.create({username:"admin",password:"admin"});
// })

router.post("/dang-nhap",passport.authenticate('local', {successReturnToOrRedirect: '/admin', failureRedirect: '/admin/dang-nhap' }));
module.exports = router;
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function (username,password,done) {
    var obj={
      username:username,password:password
    }
    
      User.findOne(obj,(err,user)=>{
          if(user){
            return done(null,user);
          }
          else{
            return done(null,false);
          }
      })
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
      done(null, user);
});
