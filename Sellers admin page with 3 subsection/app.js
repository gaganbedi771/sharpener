const express=require("express");
const bodyparser=require("body-parser");
const sequelize=require("./util/database");
const cors=require("cors");
const router=require("./routes/routes");

const app=express();
app.use(bodyparser.json());
app.use(cors());

app.use(router);


sequelize.sync()
.then(result=>{
    app.listen(5000);
})
.catch(err=>console.log(err));

