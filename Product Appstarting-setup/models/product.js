const mongodb=require("mongodb");
const getDb=require("../util/database").getDb;

class Product{
    constructor(title,price,imageUrl,description){
        this.title=title;
        this.price=price;
        this.imageUrl=imageUrl;
        this.description=description;
    }
    
    save(){
        const db=getDb();

        let dbcon=db.collection("products").insertOne(this)
        return dbcon
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

// const Product=sequelize.define('product',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   title:{
//     type: Sequelize.STRING,
//     allowNull:false
//   },
//   price:{
//     type:Sequelize.DOUBLE,
//     allowNull:false
//   },
// imageUrl:{
//   type:Sequelize.STRING,
//   allowNull:false
// },
// description:{
//   type:Sequelize.STRING,
//   allowNull:false
// }
// })

module.exports=Product;




// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//    return db.execute('INSERT INTO products(title,price,imageUrl,description) VALUES (?,?,?,?)',
//    [this.title,this.price,this.imageUrl,this.description])
//   }

//   static deleteById(id){
//     return db.execute('DELETE FROM products WHERE products.id=?',[id])
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');    
//   }
    
//   static findById(id) {
//    return db.execute('SELECT * FROM products WHERE products.id=?',[id])
//   }
// };
