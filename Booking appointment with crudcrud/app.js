const express=require('express');
const path=require("path")
const app= express();
const bodyparser=require("body-parser");
const cors=require("cors");

const mainroute=require("./routes/mainRoute");
const userRoute=require("./routes/userRoute");

const sequelize=require("./models/mainModel");

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(cors());

app.use(express.static(path.join(__dirname,"public")));

app.use(mainroute);

app.use(userRoute);

app.use((req,res,next)=>{
    res.send("<h1>Not found</h1>")
})

sequelize.sync()
.then(result=>{
    
    app.listen(2000);
})
.catch(err=>console.log(err))

