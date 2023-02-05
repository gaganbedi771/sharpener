const path=require('path');

exports.errorPage=(req,res,next)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'..','views','404.html'));
    //res.send("<h1>Page Note Found</h1>");
}