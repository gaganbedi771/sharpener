const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    paymentid:{
        type:String,
    },
    orderid:{
        type:String,
    },
    status:{
        type:String,
    }
})


module.exports=mongoose.model("Order",orderSchema);