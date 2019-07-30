var express = require("express");
var app = express();
app.set('view engine', 'ejs');
app.get("/",(req,res)=>{
    res.render('login');
})

app.get("/Buoc-1",(req,res)=>{
    res.render("buoc1");
})
app.post("/xuly",(req,res)=>{
    res.redirect("/Buoc-1");
})


app.listen(8000,()=>{
    console.log("APp đang chạy trên port 8000");
})