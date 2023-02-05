const path=require("path");
const Products=require("../models/product");

exports.getAddProduct= (req,res,next)=>{
    //console.log("In middleware");
    //res.send('<h1>Hello from exsdfsdfsdpress</h1>');
    res.sendFile(path.join(__dirname,"..",'views','add-product.html'));
    //res.send('<form action=/admin/product method="POST"><input type="text" name="product" placeholder="Product Name"><input type="number" name="quantity" placeholder="quantity"><button type="submit">Add Product</button></form>')
    //next();
}

exports.postAddProduct=(req,res,next)=>{
    const product=new Products (req.body.productname,req.body.quantity);
    product.save();
    res.redirect("/");
}

exports.getProducts=(req,res,next)=>{
    //console.log("In middleware again");
    Products.fetchAll((proList)=>{
        console.log(proList);
        res.sendFile(path.join(__dirname,'..','views','shop.html'))
    });
    
    //res.send('<h1>Main Page</h1>');
    //res.send( { key1: 'value' });
}

