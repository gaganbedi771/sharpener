const Expense = require("../models/expense");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.signUp = async (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({ customMessage: "Bad parameters" });
    }

    const alreadyExists = await User.findAll({ where: { email: email } });

    if (alreadyExists.length > 0) {
        return res.status(500).json({ customMessage: "User Already exists" });
    }

    bcrypt.hash(password, 10, (err, hashPassword) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }

        User.create({
            name: name,
            email: email,
            password: hashPassword
        })
            .then(result => {
                return res.sendStatus(201);
            })
            .catch((err) => {
                console.log(err);
                return res.sendStatus(500)
            })
    })

}

function generateAccessToken(id,name) {
    return jwt.sign({ userId: id, name:name }, "secretkey");
}

exports.signIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({ customMessage: "Bad parameters" });
    }

    try {
        const emailExists = await User.findAll({ where: { email: email } })
        if (emailExists.length == 0) {
            return res.status(404).json({ customMessage: "User not found, SignUp" });
        }

        bcrypt.compare(password, emailExists[0].password, (error, response) => {
            if (error) {
                console.log(err);
                return res.sendStatus(500)
            }
            if (response) {
                return res.status(201).json({ customMessage: "Success", token: generateAccessToken(emailExists[0].id, emailExists[0].name) });
            }
            else if (!response) {
                return res.status(401).json({ customMessage: "User not authorized" });
            }

        })

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

exports.getAll = (req, res, next) => {

    Expense.findAll({where:{userId:req.user.userId}})
        .then((data) => {
            //console.log(req.user)
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
     
        Expense.create
        ({
            category: category,
            amount: amount,
            description: description,
            userId: req.user.userId
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

