const nodemailer=require('nodemailer');

const mail=(to,competition,key,name)=>{

let transporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.user,
        pass:process.env.pass
    }
});

let mailOptions={
    from:'prima42118@gmail.com',
    to:to,
    subject:`${competition} Registration Key`,
    text:`Dear ${name}, your key is ${key}`
};

transporter.sendMail(mailOptions,function(err,data){

    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

}


module.exports = mail;