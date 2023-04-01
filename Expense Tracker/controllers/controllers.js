const Expense = require("../models/expenseModel");
const User = require("../models/users");

exports.signUp = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({ customMessage: "Bad parameters" });

    }

    ifExists();

    async function ifExists() {
        const alreadyExists = await User.findAll({ where: { email: email } });
        if (alreadyExists.length > 0) {
            return res.status(500).json({ customMessage: "User Already exists" });
        }
        else {
            User.create({
                name: name,
                email: email,
                password: password
            })
                .then(result => {
                    return res.sendStatus(201);
                })
                .catch((err) => {
                    console.log(err);
                    return res.sendStatus(500)
                })
        }
    }
}

exports.signIn=async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    if ( !email || !password) {
        return res.status(400).json({ customMessage: "Bad parameters" });

    }

    try{    
        const emailExists=await User.findAll({where:{email:email}}) 
        if(emailExists.length==0){
            return res.status(404).json({ customMessage: "User not found, SignUp" });
        }
        else if(password!==emailExists[0].password){
            return res.status(401).json({ customMessage: "User not authorized" });
        }
        else{
            return res.status(201).json({ customMessage: "Success" });
        }

    }
    catch(err){
        return res.status(500).json(err);
    }

    console.log(emailExists[0].password);
}

exports.getAll = (req, res, next) => {

    Expense.findAll()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
}

exports.addExpense = (req, res, next) => {

    const category = req.body.category
    const description = req.body.description
    const amount = req.body.amount

    if (!category || !description || !amount) {
        throw new Error("All fields are necessary");
    }

    Expense.create({
        category: category,
        amount: amount,
        description: description
    })
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
}

exports.deleteExpense = (req, res, next) => {

    const id = req.params.id
    Expense.destroy({ where: { id: id } })
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
}

exports.getDetail = (req, res, next) => {

    const id = req.params.id;

    Expense.findByPk(id)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
}

exports.updateDetails = (req, res, next) => {
    const id = req.params.id;
    const category = req.body.category
    const description = req.body.description
    const amount = req.body.amount

    if (!category || !description || !amount) {
        throw new Error("All fields are necessary");
    }

    Expense.findByPk(id)
        .then(async (result) => {
            result.category = category
            result.description = description
            result.amount = amount
            await result.save();
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
}

