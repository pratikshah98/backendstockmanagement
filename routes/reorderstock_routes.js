var reorder= require("../models/reorderstock_model");
var express = require("express");
var router = express.Router();

router.get('/:bid',function(req,res,next){
 
    reorder.getitemforreorder(req.params.bid,function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(rows);
      //console.log(rows);
      router.post('/',function(req,res,next){

 

        console.log(req.body);
    
        reorder.sendMail(req.body,function(err,message){
    
     
    
            if(err)
    
            {
    
                console.log(err);
    
                res.json(err);
    
               
    
            }
    
            else
    
            {
    
                return res.json({success: true, msg: 'sent'});//or return count for 1 or 0
    
            }
    
        });
    
    });
      }
    
    });
});


module.exports = router;
