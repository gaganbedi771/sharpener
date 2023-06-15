const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apikey = client.authentications["api-key"];
apikey.apiKey = process.env.Email_Api;
var transEmailApi = new Sib.TransactionalEmailsApi();

const User = require("../models/users");
const passRequest = require("../models/ForgotPasswordRequests");
const Expense = require("../models/expense");

const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

exports.sendLink = async (req, res, next) => {

    try {
        const uuid = uuidv4();
        const email = req.body.email;

        const user = await User.findOne({ email: email });
        if (!user) {
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
                textContent: `Click the link to reset: http://localhost:2000/password/resetpassword/${uuid}`
            }))
        })

        const p2 = new Promise((resolve, reject) => {
            const newPassResetReq = new passRequest({
                userId: user._id,
                uuid: uuid,
                isactive: "true"
            })
            resolve(newPassResetReq.save())
        })

        await Promise.all([p1, p2]);
        res.sendStatus(201);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

exports.getLink = async (req, res, next) => {
    const uuid = req.params.uuid;

    try {
        const authenticateLink = await passRequest.findOne({ uuid: uuid, isactive: "true" } )
        if (!authenticateLink) {
            return res.status(404).json({ message: "Generate Link again" });
        }

        await passRequest.findOneAndUpdate({ uuid: uuid, isactive: "true" },{ isactive: "false" });
        res.status(201).send(`
        <html>
            <script>
            function formsubmitted(e){
                e.preventDefault();
                console.log('called')
            }
            </script>
            <form action="/password/updatepassword/${uuid}" method="GET">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html > `);
        res.end();

    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}

exports.updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { newpassword } = req.query;
    try {

        const authenticateLink = await passRequest.findOne({uuid:id});
        if (!authenticateLink || !newpassword) {
            return res.status(400).json({ customMessage: "Bad parameters" });
        }
        const userId = authenticateLink.userId;

        bcrypt.hash(newpassword, 10, async (err, hashedPass) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            await User.findByIdAndUpdate(userId,{ password: hashedPass });
            return res.status(201).json({ message: "Password Updated" });
        })

    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}