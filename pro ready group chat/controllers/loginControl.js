const bcrypt = require("bcrypt");
const User = require("../models/user");
const { Sequelize } = require("sequelize");
const userServices = require("../services/userServices");

exports.signup = async (req, res, next) => {

    const { name, email, phone, password } = req.body;

    try {
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Bad parameters" });
        }

        const found = await User.findOne({ where: { email: email } });
        if (found) {
            return res.status(409).json({ message: "User Already Exists. Sign In?" });
        }

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong" })
            }
            await User.create({ name: name, email: email, phone: phone, password: hashedPassword })
            res.status(200).json({ message: "User Added" });
        })


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}

exports.signin = async (req, res, next) => {
    const { emailorphone, password } = req.body;

    try {
        if (!emailorphone || !password) {
            return res.status(400).json({ message: "Bad parameters" });
        }
        const emailorphoneSaved = await User.findOne({ where: Sequelize.or({ email: emailorphone }, { phone: emailorphone }) })
        if (!emailorphoneSaved) {
            return res.status(404).json({ message: "User Not Found. SignUp?" });
        }
        console.log(emailorphoneSaved.password);
        bcrypt.compare(password, emailorphoneSaved.password, (error, response) => {
            if (error) {
                return res.status(500).json({ message: "Something Went Wrong" });
            }
            if (response) {
                return res.status(200).json({ message: "Authorised User", token: userServices.generateWebToken(emailorphoneSaved.id, emailorphoneSaved.name) });
            }
            else if (!response) {
                return res.status(401).json({ message: "Unauthorised User" });
            }
        })
        // console.log(emailorphoneSaved);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}