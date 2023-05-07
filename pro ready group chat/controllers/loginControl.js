const bcrypt = require("bcrypt");
const User = require("../models/user");
const { Sequelize } = require("sequelize");
const userServices = require("../services/userServices");
const path=require("path");

const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apikey = client.authentications["api-key"];
apikey.apiKey = process.env.Email_Api;
var transEmailApi = new Sib.TransactionalEmailsApi();
const { v4: uuidv4 } = require("uuid");
const PassRequest = require("../models/passRequest");

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

exports.sendLink = async (req, res, next) => {
    
    try {
        const uuid = uuidv4();
        const email = req.body.email;
        const foundUser = await User.findOne({ where: { email: email } });
        if (!foundUser) {
            return res.status(404).json({ message: "user doesn't exists" });
        }

        const sender = {
            email: "gaganbedi771@gmail.com"
        }

        const receivers = [
            {
                email: email
            }
        ]

        const p1 = new Promise((resolve, reject) => {
            resolve(transEmailApi.sendTransacEmail({
                sender,
                to: receivers,
                subject: "Reset requested",
                textContent: `Click the link to reset: http://localhost:3000/resetpassword/${uuid}`
            }))
        })

        const p2 = new Promise((resolve, reject) => {


            resolve(PassRequest.create({
                id: uuid,
                isactive: "true",
                userId: foundUser.dataValues.id
            }))


        })

        await Promise.all([p1, p2]);
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

exports.resetPage = async (req, res, next) => {
    const uuid = req.params.uuid;

    try {
        const authenticateLink = await PassRequest.findOne({ where: { id: uuid, isactive: "true" } })
        if (!authenticateLink) {
            return res.status(404).json({ message: "Generate Link again" });
        }

        await PassRequest.update({ isactive: "false" }, { where: { id: uuid, isactive: "true" } });
        res.status(201).send(`
        <html>
            <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
            </script>
            <form action="/updatepassword/${uuid}" method="GET">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html > `);
        res.end();

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }

}

exports.updatepassword = async (req, res, next) => {
    const { id } = req.params;
    const { newpassword } = req.query;
    try {

        const authenticateLink = await PassRequest.findByPk(id);
        if (!authenticateLink || !newpassword) {
            return res.status(400).json({ customMessage: "Bad parameters" });
        }
        const userId = authenticateLink.dataValues.userId;

        bcrypt.hash(newpassword, 10, async (err, hashedPass) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            await User.update({ password: hashedPass }, { where: { id: userId } });
            res.status(201).send('<html><script>window.location.href = "../views/signin.html"</script></html>');
            res.end();
            // return res.status(201).json({ message: "Password Updated" });
            
        })
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
}