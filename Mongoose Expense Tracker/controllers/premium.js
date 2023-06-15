const sequelize = require("../util/database");
const Expense = require("../models/expense");
const User = require("../models/users");
const Order = require("../models/order");
const DownloadedExpense = require("../models/downloadedExpense");
const userServices = require("../services/userservices");
const Razorpay = require("razorpay");
require('dotenv').config();

const S3Services = require("../services/s3services");

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
    const t = await sequelize.transaction();
    try {
        const id = req.user.dataValues.id;
        const name = req.user.dataValues.name;

        const order = await Order.findOne({ where: { orderid: req.body.order_id } });


        const p1 = new Promise((resolve, reject) => {

            resolve(order.update({ paymentid: req.body.payment_id, status: "Success" }, { transaction: t }))
        })
        const p2 = new Promise((resolve, reject) => {

            resolve(req.user.update({ premium: "yes" }, { transaction: t }))
        })

        await Promise.all([p1, p2])

        await t.commit();
        return res.status(201).json({ message: "Tables Updated", token: userServices.generateAccessToken(id, name, "yes") })

    }

    catch (err) {

        console.log(err)
        await t.rollback();
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

exports.sendDownloadLink = async (req, res, next) => {

    try {
        if (req.user.dataValues.premium != "yes") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // const expenses=await Expense.findAll({where:{userId:req.user.dataValues.id}});

        const expenses = await req.user.getExpenses();
        const stringifiedExpenses = JSON.stringify(expenses);
        const date = new Date();
        const filename = `Expenses${req.user.id} ${date}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringifiedExpenses, filename);

        const p1=new Promise((resolve,reject)=>{
            resolve(req.user.getDownloadedExpenses());
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(req.user.createDownloadedExpense({ link: fileUrl, date: date }))
        })

        const expensesList=await Promise.all([p1,p2])
        
        expensesList[0].push(expensesList[1]);
    
        // console.log("fileUrl", fileUrl)
        res.status(200).json({ fileUrl: fileUrl, list:expensesList[0] });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

