const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use("/chatroom", (req, res, next) => {

    fs.readFile("./messages.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        if (data == "") {
            data = '"No chat exists"';
        }

        res.write('<html>')
        res.write('<head><title>Send Message</title></head>');
        res.write('<body>');
        
        res.write(data);
        
        res.write('<h1>Enter Message</h1><form action="/msgRec" method="POST"><input type="hidden" id="usrname" name="username"> <input type="text" name="message" placeholder="Enter Message" required><button type="submit">Send</button></input></form><script>if(localStorage.getItem("username")==undefined){location.href="/login"};document.getElementById("usrname").value=localStorage.getItem("username")</script>')
        res.write('</body>');
        res.write('</html>')
        res.send();
    })
})

router.post("/msgRec", (req, res, next) => {
    if (req.body["username"]) {
        let str = req.body["username"] + ': ' + req.body["message"] + "\n";
        fs.appendFile('messages.txt', str, (err) => { console.log(err) });
        res.redirect("/chatroom")
    }
    else {
        res.redirect("/login");
    }

})
module.exports = router;