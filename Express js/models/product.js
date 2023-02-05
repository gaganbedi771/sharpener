const fs=require("fs");
const path=require("path");

module.exports=class{
    constructor(title,quantity){
        this.title=title;
        this.quantity=quantity;
    }

    save(){
        const p=path.join(__dirname,'..','data','productData.json');
        
        fs.readFile(p,(err,data)=>{
            fs.readFile(p,(err,data)=>{
                let productList=[];
                if(!err){
                    productList=JSON.parse(data);
                }
                productList.push(this);
                fs.writeFile(p,JSON.stringify(productList),(err)=>{
                    if(err){console.log(err)}
                })
            })
        })       
    }

    static fetchAll(cb){
        const p=path.join(__dirname,'..','data','productData.json');
        fs.readFile(p,(err,data)=>{
            if(err){
                cb([]);
            }
            cb (JSON.parse(data));
        })
    }
}