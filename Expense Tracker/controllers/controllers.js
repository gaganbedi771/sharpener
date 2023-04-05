const { where } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const Order = require("../models/order");
require('dotenv').config();


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

function generateAccessToken(id, name) {
    return jwt.sign({ id: id, name: name }, "secretkey");
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

    Expense.findAll({ where: { userId: req.user.dataValues.id } })
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

    req.user.createExpense
        // Expense.create
        ({
            category: category,
            amount: amount,
            description: description
            // userId: req.user.userId
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
    Expense.destroy({ where: { id: id, userId: req.user.dataValues.id } })
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

    Expense.findOne({ where: { id: id, userId: req.user.dataValues.id } })
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

exports.buyPremium = (req, res, next) => {

    const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    var options = {
        amount: 3700,
        currency: "INR"
    }

    rzp.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            throw new Error(JSON.stringify(err));
        }
        //console.log(order);
        req.user.createOrder({ orderid: order.id, status: "PENDING" })
            .then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            })
            .catch(err => {
                console.log(err);
                return res.status(403).json({ message: "Something wrong", error: err });
            })
    })
}

exports.updatePremium = (req, res, next) => {

    Order.findOne({ where: { orderid: req.body.order_id } })
        .then(order => {
            order.update({ paymentid: req.body.payment_id, status: "Success" })
                .then(() => {
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ err: err });
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err })
            return
        })

    User.findByPk(req.user.dataValues.id)
        .then(user => {
            user.update({ premium: "yes" })
                .then(() => {
                    res.status(201).json({ message: "Tables Updated" })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ err: err })
                })

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: err })
        })
}

exports.updateFailure=(req,res,next)=>{
    
    Order.findOne({where:{orderid:req.body.order_id}})
    .then(order=>{
        order.update({status:"failed"})
        .then(()=>{
            res.status(201).json({message:"Table updated"});
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json(err);
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({err:err})
    })
}

exports.checkPremium=(req,res,next)=>{
    
    const userId=req.user.dataValues.id;
    User.findByPk(userId)
    .then(user=>{
        res.status(201).json({message:user.dataValues.premium});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:"cannot fetch premium details"});
    })
}