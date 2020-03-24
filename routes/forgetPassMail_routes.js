var Mymail=require('../models/forgetPassMail');
var express=require('express');
var router=express.Router();
router.get('/:userEmailId',function(req,res,next){
    Mymail.sendEmail(req.params.userEmailId,function(err,status){ 
        if(err)
          {
            res.json(err);
          }
          else
          {
            res.send(status);
          }
        
        });
});
module.exports=router;