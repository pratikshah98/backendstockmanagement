var sale=require('../models/sales_model');
var express=require('express');
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
      res.json(rows);
      }
    });
  });

 
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


module.exports=router;