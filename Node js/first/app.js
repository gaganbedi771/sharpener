// const server = http.createServer(function (req,res){
//     console.log(req);
//     res.setHeader('Content-Type','text/html')
// });
// server.listen(3000);

const http= require('http');
const server=http.createServer(function(req,res){
    console.log("Gagan");
})
server.listen(4000);