class User{
  static userCount=0;
  constructor(username,email,password){
    this.username=username;
    this.email=email;
    this.password=password;
    User.userCount++;
    this.matd=new Date(); //mem active till date
    //console.log(this.membershipactivetilldate.getFullYear());
    console.log(`${this.username} is now registered on ${this.matd} received 1month free `);
    this.tarilPlusmatd=new Date(
      this.matd.getFullYear(),
      this.matd.getMonth()+1,
      this.matd.getDay()
      );
    console.log(`Membership active till ${this.tarilPlusmatd}`);
    
  }
  
  static count(){
    return User.userCount;
  }
  
  renewMembership(num,period){
    if(period=='M'){
      this.paidMembership=new Date(
        this.tarilPlusmatd.getFullYear(),
        this.tarilPlusmatd.getMonth()+num,
        this.tarilPlusmatd.getDay()
        )
      return (`${this.username}'s membership active till ${this.paidMembership}`);  
    }
    else if(period=='Y'){
      this.paidMembership=new Date(
        this.tarilPlusmatd.getFullYear()+num,
        this.tarilPlusmatd.getMonth(),
        this.tarilPlusmatd.getDay()
        )
      return (`${this.username}'s membership active till ${this.paidMembership}`);  
    }
    else{
      return (`Enter in correct format`);
    }
  }
}
const u1=new User('gagan','@gmail.com','pass');
const u2=new User('bedi','@hotmail.com','phisss');
console.log(`${User.count()} is the total users registered`);
console.log(u1.renewMembership(1,'M'));
console.log(u2.renewMembership(1,'Y'));


async function fun1(){
  console.log('a');
  console.log('b');
  await new Promise ((res,rej)=>{
    setTimeout(()=>{
      console.log('c')
      res();
    },3000);
  })
  
  await new Promise ((res,rej)=>{
    setTimeout(()=>{
      console.log('d');
      res();
    },0);
  })
  console.log('e');
}


fun1()


