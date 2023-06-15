exports.error=(req,res,next)=>{
    res.status(404).send("Invalid URL");
}