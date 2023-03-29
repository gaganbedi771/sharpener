const Product=require("../models/products");

exports.submit=(req,res,next)=>{

    const name=req.body.name;
    const price=req.body.price;
    const category=req.body.category;

    if (!name || !price || !category) {
        throw new Error("All fields are necessary");
    }

    Product.create({
        name:name,
        price:price,
        category:category
    })
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

exports.getAll=(req,res,next)=>{

    Product.findAll()
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err)
    });
}

exports.delete=(req,res,next)=>{

    const id=req.params.id;

    Product.destroy({where:{id:id}})
    .then(product=>{
        res.sendStatus(201);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

exports.getProduct=(req,res,next)=>{
    const id=req.params.id;
    Product.findByPk(id)
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}