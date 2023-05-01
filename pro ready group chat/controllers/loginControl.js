const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
    const User = require("../models/users");
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    try {
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Bad parameters" });
        }

        const found = await User.findOne({ where: { email: email } });
        if (found) {
            return res.status(409).json({ message: "User Already Exists" });
        }

        bcrypt.hash(password, 10, async(err, hashedPassword) => {
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