var db=require('../dbconnec'); 
var nodemailer = require('nodemailer');


 
var reorder={
   

getitemforreorder:function(bid,callback)
{
    return db.query("select * from item join stock on (item.itemId=stock.fkItemId) join branch on (stock.fkBranchId=branch.branchId) join User on (User.fkBranchId=branch.branchId) join role on (role.roleId=User.fkRoleId) where stock.stockQuantity<=item.reorderLevel and branch.branchId=? and role.roleName='Admin' ",[bid],callback)
},
sendMail:function(demo,callback){  

    var transporter = nodemailer.createTransport({
    
      service: 'gmail',
    
      auth: {
    
        user: 'prachisoni24599@gmail.com',
    
        pass: 'mauliprachi'
    
      }
    
    });
    
     
    
    var mailOptions = {
    
      from: 'prachisoni24599@gmail.com',
    
      to: demo.to,
    
      subject:demo.subject,
    
      text:demo.text
    
    };
    
     
    
    transporter.sendMail(mailOptions, function(error, info){
    
      if (error) {
    
        console.log(error);
    
      } else {
    
        console.log('Email sent: ' + info.response);
    
      }
    
    });
    
     
    
    }

};


module.exports=reorder;
