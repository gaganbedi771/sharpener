const express=require('express');
const app=express();
const path=require('path');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const contactusRoutes=require('./routes/contactus');
const errorRoutes=require("./routes/404");

const bodyParser= require('body-parser');
app.use (bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use(contactusRoutes);
app.use(errorRoutes);

app.listen(3000);