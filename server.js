var express = require("express");
var app = express();
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render('login');
})
app.listen(8000,()=>{
    console.log("APp đang chạy trên port 8000");
})