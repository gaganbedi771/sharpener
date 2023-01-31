const reqHandler = (req,res) => {
    const fs = require("fs");
    const method = req.method;
    if (req.url == '/home') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write('<body>');
        fs.readFile('message.txt', 'utf8', (err, data) => {
            res.write(`<p>${data}</p>`);
            res.write('<h1>Enter Message </h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
            res.write('</body>');
            res.write('</html>')
            return res.end();
        });
    }
    else if (req.url == '/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write('<body><h1>Welcome to About Us page</h1></body>')
        res.write('</html>')
        return res.end();
    }
    else if (req.url == '/node') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>My First Page</title></head>')
        res.write('<body><h1>Welcome to my Node Js project</h1></body>')
        res.write('</html>')
        return res.end();
    }
    else if (req.url = '/message' && method == "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString();
            const message = parsedbody.split('=')[1];
            fs.writeFile("message.txt", message, (err) => {
                if (err) {
                    console.log(err);
                }
                res.statusCode = 302; //302==redirection
                res.setHeader('Location', '/home')
                return res.end();
            });
        })
    }
}

module.exports=reqHandler;