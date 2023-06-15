const sequelize = require("../util/database");
const Expense = require("../models/expense");
const User = require("../models/users");
const Order = require("../models/order");
const DownloadedExpense = require("../models/downloadedExpense");
const userServices = require("../services/userservices");
const Razorpay = require("razorpay");

const S3Services = require("../services/s3services");

exports.buyPremium = async (req, res, next) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        var options = {
            amount: 3700,
            currency: "INR"
        }

        rzp.orders.create(options,async (err, order) => {
            if (err) {
                console.log(err);
                throw new Error(JSON.stringify(err));
            }
            const newOrder = new Order({
                userId: req.user._id,
                orderid: order.id,
                status: "PENDING"
            })
            await newOrder.save();
            return res.status(201).json({ order, key_id: rzp.key_id });
        }
        )
    }
    catch (err) {

        console.log(err);
        return res.status(403).json({ message: "Something wrong", error: err });
    }
}

exports.updatePremium = async (req, res, next) => {
    
    try {
        const p1 = new Promise((resolve, reject) => {

            resolve(
                Order.findOneAndUpdate({userId:req.user._id, orderid: req.body.order_id },{ paymentid: req.body.payment_id, status: "Success" }  )
            )
        })
        const p2 = new Promise((resolve, reject) => {

            resolve(User.findByIdAndUpdate(req.user._id,{ premium: "yes" }))
        })

        const [updatedOrder,updatedUser]=await Promise.all([p1, p2]);
        req.user=updatedUser;
        return res.status(201).json({ message: "Tables Updated", token: userServices.generateAccessToken(req.user._id, req.user.name, "yes") })

    }

    catch (err) {

        console.log(err)
        res.status(500).json({ err: err });
    }
}

exports.updateFailure = async (req, res, next) => {

    try {
        await Order.findOneAndUpdate({ userId:req.user._id,orderid: req.body.order_id },{ status: "failed" });
        res.status(201).json({ message: "Table updated" });
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ err: err })
    }
}

exports.checkPremium = async (req, res, next) => {
    try {
        res.status(201).json({ message: req.user.premium });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "cannot fetch premium details" });
    }
}

exports.showLeaderBoard = async (req, res, next) => {

    try {

        let usersExpense = await User.find()
        .select('name totalExpense -_id')
        .sort({totalExpense: -1 })

        res.status(201).json(usersExpense);
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

        const p1 = new Promise((resolve, reject) => {
            resolve(req.user.getDownloadedExpenses());
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(req.user.createDownloadedExpense({ link: fileUrl, date: date }))
        })

        const expensesList = await Promise.all([p1, p2])

        expensesList[0].push(expensesList[1]);


        res.status(200).json({ fileUrl: fileUrl, list: expensesList[0] });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

}

