const path=require("path");

exports.getAddProduct= (req,res,next)=>{
    //console.log("In middleware");
    //res.send('<h1>Hello from exsdfsdfsdpress</h1>');
    res.sendFile(path.join(__dirname,"..",'views','add-product.html'));
    //res.send('<form action=/admin/product method="POST"><input type="text" name="product" placeholder="Product Name"><input type="number" name="quantity" placeholder="quantity"><button type="submit">Add Product</button></form>')
    //next();
}

exports.postAddProduct=(req,res,next)=>{
    console.log(req.body);
    res.redirect("/");
}

exports.getProducts=(req,res,next)=>{
    //console.log("In middleware again");
    res.sendFile(path.join(__dirname,'..','views','shop.html'))
    //res.send('<h1>Main Page</h1>');
    //res.send( { key1: 'value' });
}

exports.errorPage=(req,res,next)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'..','views','404.html'));
    //res.send("<h1>Page Note Found</h1>");
}