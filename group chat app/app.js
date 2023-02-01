const express=require("express");
const app=express();
const fs=require("fs");
const lc=require("localstorage")
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/login",(req,res,next)=>{
    res.send('<html><head><title>User Details</title><body><h1>Enter Username</h1><form action="/" method="POST"><input type="text" id="username" name="username" placeholder="Enter Username" required><button type="submit" onClick="addtolc()">Submit</button></input></form> <script>function addtolc() {localStorage.setItem("username",document.getElementById("username").value)}</script></body></head></html>');

})


app.post("/",(req,res,next)=>{
    console.log(req.body["message"]);
    if(req.body["message"]!==undefined ){
        let str= req.body["username"]+': ' + req.body["message"] +"\n";
        req.body["message"]=undefined;
        console.log(req.body["message"]);
        fs.appendFileSync('messages.txt',str,(err)=>{console.log(err)});
    }
    
    fs.readFile("./messages.txt","utf-8",(err,data)=>{
        if(err){
            console.log(err);
            return ;
        }
        //rec=data;
        //console.log(rec+"inside")
        
        res.write('<html>')
        res.write('<head><title>Send Message</title></head>');
        res.write('<body>');
        res.write('<p>');
        res.write(data);
        res.write('</p>');

        res.write('<h1>Enter Message</h1><form action="/" method="POST"><input type="hidden" id="usrname" name="username"> <input type="text" name="message" placeholder="Enter Message" required><button type="submit">Send</button></input></form><script>document.getElementById("usrname").value=localStorage.getItem("username")</script>')
        res.write('</body>');
        res.write('</html>')
        res.send();
    })
    //console.log(rec);
    // res.send();
    //res.send(`<html> <head><title>Send Message</title></head> <body><p>${file}</p><h1>Enter Message</h1><form action="/" method="POST"><input type="hidden" id="usrname" name="username" <input type="text" name="message" placeholder="Enter Message" required><button type="submit">Submit</button></input></form><script>document.getElementById("usrname").value=localStorage.getItem("username")</script></body></html>`);
})

app.use((req,res,next)=>{
    res.status=404;
    res.send("<h1>Page not found</h1>")
})
app.listen(5000);