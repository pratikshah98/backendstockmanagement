var sale=require('../models/sales_model');
var express=require('express');
var db=require('../dbconnec'); //reference of dbconnection.js

var router=express.Router();
router.get('/',function(req,res,next){
 
    sale.GetAllSale(function(err,rows){
     
    if(err)
      {
      res.json(err);
      }
      else
      {
      res.json(rows);
      }
    
    });
});
router.get('/:saleId',function(req, res, next) {
  sale.GetAllSaleById(req.params.saleId,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/',function(req,res,next){
    sale.addSale(req.body,function(err,rows){
      
      if(err)
      {
        console.log(err);
      }
      else
      {
        //console.log(rows);
        res.json(rows);
      //  console.log("id is"+" "+rows.insertId);
        // sale.getId(req.body,function(err1,rows1){
        //   if(err1)
        //   {
        //     res.json(err1);
        //   }
        //   else
        //   {
        //     res.json(rows1);
        //   }
        // })

      
      }
      
     //console.log("id is"+" "+rows.insertId);
    }
    
  );

  }


);
  

 
  router.put('/:id?',function(req,res,next){
   sale.updateSale(req.params.id,req.body,function(err,rows){
            if(err)
            {
            res.json(err);
            }
            else
            {
            res.json(rows);
            }
    });
   });
   router.delete('/:id', function(req, res, next) {
    sale.deleteSale(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
  router.post('/deleteMultiple', function(req, res, next) {
    console.log(req.body);
    db.query("delete from salesdetails where fkSaleId in (?)",[req.body],function(err,result,fields){
        // console.log(results);
        if(result){
            db.query("delete from Sale where saleId in (?)",[req.body],function(err1,rows){
              if (err1) {
                res.json(err1);
              } else {
                res.json(rows);
              }
            });  
        }
        else if(err){
          res.json(err);
        }
    });
  });


module.exports=router;