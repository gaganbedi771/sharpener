const Sib=require("sib-api-v3-sdk");
const client=Sib.ApiClient.instance;
const apikey=client.authentications["api-key"];
apikey.apiKey = process.env.Email_Api;
var transEmailApi = new Sib.TransactionalEmailsApi();



exports.resetPass=async (req,res,next)=>{
    const email= req.body.email;
    console.log(email);

    const sender={
        email:"gaganbedi771@gmail.com"
    }
    
    const receivers=[
        {
            email:email
        }
    ]
    transEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Reset requested",
        textContent:"Click here to reset"
    })
    .then((r)=>{
        console.log(r)
    })
    .catch(err=>console.log(err))
}