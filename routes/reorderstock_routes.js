var reorder= require("../models/reorderstock_model");
var express = require("express");
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/:bid',function(req,res,next){
 
    reorder.getitemforreorder(req.params.bid,function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      { 
      //res.json(rows);
      //console.log(rows);
      for(i=0;i<rows.length;i++)
      {
         console.log(rows[i]);
        var transporter = nodemailer.createTransport({
    
            service: 'gmail',
          
            auth: {
          
              user: 'dhairyajariwala26@gmail.com',
          
              pass: 'abcdEfg@12'
          
            },
            tls:{
                rejectUnauthorized:false
            }
          
          });
          
           
          
          var mailOptions = {
          
            from: 'dhairyajariwala26@gmail.com',
          
            to: rows[i].userEmailId,
          
            subject:'REMAINDER OF REORDER ITEM',
          
            //text:rows[i].itemId,
            html:'<table style="border:1px solid black; padding:20px; margin:20px;"> '+
            '<tr>'+
            '<th>  ITEM NAME      <th>'+
            '<th>  ITEM QUANTITY  <th>'+
            '</tr>'+

            '<tr>'+
            '<th>'+ rows[i].name          +'</th>'+'&nbsp;&nbsp;&nbsp;'+
            '<th>'+ rows[i].stockQuantity +'</th>'+
            
            '</tr>'+
            '</table>'
            
          };
          
           
          
          transporter.sendMail(mailOptions, function(error, info){
          
            if (error) {
          
              console.log(error);
          
            } else {
          
              console.log('Email sent: ' + info.response);
          
            }
          
          });
              
           
        
      }
      
          
      }
});

});
  
module.exports = router;


