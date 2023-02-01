const express=require('express');
const app=express();

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');

const bodyParser= require('body-parser');
app.use (bodyParser.urlencoded({extended: true}));

app.use("/admin",adminRoutes);
app.use(shopRoutes);
    
app.use((req,res,next)=>{
    res.status(404);
    res.send("<h1>Page Note Found</h1>");
})

app.listen(3000);