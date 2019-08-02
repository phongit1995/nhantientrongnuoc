var express = require('express');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require("../models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.send('chào mừng tới admin');
  }
  else{
    res.redirect("/admin/dang-nhap");
  }
  
});
router.get("/dang-nhap",(req,res)=>{
    res.render("admin/login");
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
