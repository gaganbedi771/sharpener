// const { where, STRING } = require("sequelize");
const Expense = require("../models/expense");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const Order = require("../models/order");
const sequelize = require("../util/database");
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

function generateAccessToken(id, name, premium) {
    return jwt.sign({ id: id, name: name, premium: premium }, process.env.SECRET_KEY);
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
                return res.status(201).json({ customMessage: "Success", token: generateAccessToken(emailExists[0].id, emailExists[0].name, emailExists[0].premium) });
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

exports.addExpense = async (req, res, next) => {

    const category = req.body.category
    const description = req.body.description
    const amount = req.body.amount

    const newTotal = Number(req.user.totalExpense) + Number(amount)
    const t = await sequelize.transaction();

    if (!category || !description || !amount) {
        throw new Error("All fields are necessary");
    }


    const p1 = new Promise((resolve, reject) => {
        resolve(
            req.user.createExpense
                ({
                    category: category,
                    amount: amount,
                    description: description
                }, { transaction: t })
        )
    })

    const p2 = new Promise(async (resolve, reject) => {
        resolve(
            req.user.update({ totalExpense: newTotal }, { transaction: t })
        )
    })

    Promise.all([p1, p2])
        .then(async (result) => {
            await t.commit();
            res.status(201).json(result[0]);
        })
        .catch(async (err) => {
            await t.rollback();
            console.log(err);
            res.status(500).json(err);
        })

    // req.user.createExpense
    //     // Expense.create
    //     ({
    //         category: category,
    //         amount: amount,
    //         description: description
    //         // userId: req.user.userId
    //     })
    //     .then((result) => {
    //         res.status(201).json(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     })
}

exports.deleteExpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const id = req.params.id
        const expense = await Expense.findOne({ where: { id: id, userId: req.user.dataValues.id } });
        const amount = expense.dataValues.amount;
        const newTotal = Number(req.user.totalExpense) - Number(amount);

        const p1 = new Promise((resolve, reject) => {
            resolve(expense.destroy({ transaction: t }));
        })

        const p2 = new Promise((resolve, reject) => {

            resolve(
                req.user.update({ totalExpense: newTotal }, { transaction: t })
            )
        })

        Promise.all([p1, p2])
            .then(async () => {
                await t.commit();
                res.sendStatus(201);
            })
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }

    // Expense.destroy({ where: { id: id, userId: req.user.dataValues.id } })
    //     .then(result => {
    //         res.sendStatus(201);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     })
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

exports.updateDetails = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = req.body.category
        const description = req.body.description
        const amount = req.body.amount
        const t = await sequelize.transaction();

        if (!category || !description || !amount) {
            throw new Error("All fields are necessary");
        }

        const expense = await Expense.findOne({ where: { id: id, userId: req.user.dataValues.id } })
        const preAmount = Number(expense.dataValues.amount);

        const totalAmount = Number(req.user.totalExpense);
        const newTotal = totalAmount - preAmount + Number(amount);

        const p1 = new Promise((resolve, reject) => {
            resolve(expense.update({ amount: amount }, { transaction: t }))
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(req.user.update({ totalExpense: newTotal }, { transaction: t }))
        })

        const result = await Promise.all([p1, p2])

        await t.commit();
        res.status(201).json(result[0]);
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }

    // Expense.findOne({ where: { id: id, userId: req.user.dataValues.id } })
    //     .then(async (result) => {
    //         result.category = category
    //         result.description = description
    //         result.amount = amount
    //         await result.save();
    //         res.status(201).json(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     })
}

exports.buyPremium = async (req, res, next) => {

    const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })

    var options = {
        amount: 3700,
        currency: "INR"
    }

    const t = await sequelize.transaction();
    rzp.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            throw new Error(JSON.stringify(err));
        }

        req.user.createOrder({ orderid: order.id, status: "PENDING" }, { transaction: t })
            .then(async () => {
                await t.commit();
                return res.status(201).json({ order, key_id: rzp.key_id });
            })
            .catch(async err => {
                await t.rollback();
                console.log(err);
                return res.status(403).json({ message: "Something wrong", error: err });
            })
    })
}

exports.updatePremium = async (req, res, next) => {

    try {
        const id = req.user.dataValues.id;
        const name = req.user.dataValues.name;

        const order = await Order.findOne({ where: { orderid: req.body.order_id } });
        const t = await sequelize.transaction();

        const p1 = new Promise((resolve, reject) => {
            resolve(order.update({ paymentid: req.body.payment_id, status: "Success" }, { transaction: t }))
        })
        const p2 = new Promise((resolve, reject) => {
            resolve(req.user.update({ premium: "yes" }, { transaction: t }))
        })

        await Promise.all([p1, p2])

        await t.commit();
        res.status(201).json({ message: "Tables Updated", token: generateAccessToken(id, name, "yes") })

    }

    catch (err) {
        await t.rollback();
        console.log(err)
        res.status(500).json({ err: err });
    }
}

exports.updateFailure = async (req, res, next) => {

    try {
        const order = await Order.findOne({ where: { orderid: req.body.order_id } })
        await order.update({ status: "failed" });
        res.status(201).json({ message: "Table updated" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ err: err })
    }
}

exports.checkPremium = async (req, res, next) => {
    try {
        const userId = req.user.dataValues.id;
        const user = await User.findByPk(userId)

        res.status(201).json({ message: user.dataValues.premium });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot fetch premium details" });
    }
}

    exports.showLeaderBoard = async (req, res, next) => {

        try {
            // let userdata=await Expense.findAll({
            //     attributes:[[sequelize.fn("sum",sequelize.col("expenses.amount")),"total"]],
            //     include:[{
            //         model:User,
            //         attributes:["name"]    
            //     }],
            //     group:["userId"]
            // });

            // let userD = await User.findAll({
            //     attributes: ["name", [sequelize.fn("sum", sequelize.col("expenses.amount")), "total"]],

            //     include: [{
            //         model: Expense,
            //         attributes: []
            //     }],
            //     group: ["users.id"],
            //     order: [["total", "DESC"]]
            // })

            // console.log(userD);

            let usersExpense = await User.findAll({
                attributes: ["name", "totalExpense"],
                order: [["totalExpense", "DESC"]]
            });
            // console.log(usersExpense);

            res.status(201).json(usersExpense);

            //     let ldrBoardData = {};

            //     const userData = await User
            //     .findAll({
            //             attributes:["name",[sequelize.fn("sum",sequelize.col("expenses.amount")),"total"]],

            //             include:[{
            //                 model: Expense,
            //                 attributes:["amount","userId"]

            //             }],
            //           group:["expenses.userId"]

            // });
            // console.log(userData,"userdfatad");
            // expenses.forEach(expense => {
            //     const identifier = expense.dataValues.userId;
            //     if (ldrBoardData[identifier] == undefined) {
            //         ldrBoardData[identifier] = expense.dataValues.amount;
            //     }
            //     else {
            //         const preTotal = ldrBoardData[identifier]["total"];
            //         ldrBoardData[identifier] = ldrBoardData[identifier] + expense.dataValues.amount;
            //     }

            // })


            // const ldrBoardDataArr=[];
            //  const users=await User.findAll({attributes:["name","id"]});
            //  users.forEach(user=>{
            //     ldrBoardDataArr.push({name:user.dataValues.name, total: ldrBoardData[user.dataValues.id]||0});
            //  })
            // ldrBoardDataArr.sort((a,b)=>b["total"]-a["total"]);
            // console.log(ldrBoardDataArr);
            // res.status(201).json(ldrBoardDataArr);
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }