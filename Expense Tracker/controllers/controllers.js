const Expense = require("../models/expenseModel");
const User = require("../models/users");

exports.signUp = (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    async function ifExists() {
        const alreadyExists = await User.findAll({ where: { email: email } });
        if (alreadyExists.length>0) {
            // console.log(alreadyExists)
            res.status(201).json({ existed: true });
        }
        else {
            User.create({
                name: name,
                email: email,
                password: password
            })
                .then(result => {
                    res.sendStatus(201);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500)

                })

        }
    }

    ifExists();


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

