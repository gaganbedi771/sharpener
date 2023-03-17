//const path = require("path");
const dbConnection = require("../models/mainModel");

exports.get = (req, res, next) => {
    dbConnection.findAll()
        .then(allRecord => {
            res.status(200).json(allRecord);
        })
        .catch(err => console.log(err));
}

exports.put = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    if(!name || !email){
        throw new Error("All fields are necessary");
    }
    dbConnection.create({
        name: name,
        email: email
    })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log("ERROR received:" + err)
            res.status(500).json(err);
        })
}

exports.deleteUser = async (req, res, next) => {
    const uId = req.params.id;
    console.log("Balle")
    await dbConnection.destroy({ where: { id: uId } });
    res.sendStatus(200);
}

exports.getUser= (req,res,next)=>{
    const id=req.params.id;
    dbConnection.findByPk(id)
    .then(result=>{
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
    })

}

exports.updateUser= (req,res,next)=>{
    
    const id=req.params.id;

    dbConnection.findByPk(id)
    .then(async(result)=>{
        result.name=req.body.name;
        result.email=req.body.email;
        await result.save();
        res.sendStatus(200);
    })
    .catch(err=>{
        console.log(err);
    })
}