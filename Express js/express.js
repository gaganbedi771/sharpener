const express=require('express');
const app=express();
const path=require('path');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const contactusRoutes=require('./routes/contactus');

const bodyParser= require('body-parser');
app.use (bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use(contactusRoutes);
app.use((req,res,next)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'views','404.html'));
    //res.send("<h1>Page Note Found</h1>");
})

app.listen(3000);