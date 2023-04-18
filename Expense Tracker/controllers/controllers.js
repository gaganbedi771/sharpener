const Expense = require("../models/expense");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const Order = require("../models/order");
const sequelize = require("../util/database");
const userServices = require("../services/userservices");


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
                return res.status(201).json({ customMessage: "Success", token: userServices.generateAccessToken(emailExists[0].id, emailExists[0].name, emailExists[0].premium) });
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

exports.getAll = async (req, res, next) => {
    try {
        const page = Number(req.query.page);
        const entries = Number(req.query.entries);
        // console.log(page,"page no requested",entries);
        const p1 = new Promise((resolve, reject) => {
            resolve(req.user.countExpenses())
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(req.user.getExpenses({
                offset: (page - 1) * entries,
                limit: entries
            }))
        })

        const [total,data] = await Promise.all([p1, p2]);

        res.status(201).json({ 
            expenses: data, 
            IsPremium: req.user.premium,
            currentPage:page,
            hasPreviousPage:page>1,
            previousPage:page-1,
            hasNextPage:entries*page<total,
            nextPage:page+1,
            lastPage:Math.ceil(total/entries)
        
        });
    }

    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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

