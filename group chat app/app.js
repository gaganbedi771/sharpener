const express=require("express");
const app=express();

const loginRoutes=require("./routes/login");
const chatroomRoutes=require("./routes/chatroom");

const fs=require("fs");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

const path=require("path");


app.use(loginRoutes);
app.use(chatroomRoutes);


app.use((req,res,next)=>{
    res.status=404;
    res.send("<h1>Page not found</h1>")
})
app.listen(5000);