var stock=require('../models/stock_model');
var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
 
    stock.GetAllStock(function(err,rows){
     
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
router.get('/:item_id/:branch_id',function(req, res, next) {
  stock.GetAllStockById(req.params.item_id,req.params.branch_id,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/',function(req,res,next){
    stock.addStock(req.body,function(err,rows){
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

  router.put('/:fk_itemId?/:fk_branchId?',function(req,res,next){
    stock.updateStock(req.params.fk_itemId,req.params.fk_branchId,req.body,function(err,rows){
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
   router.delete('/:fk_itemId/:fk_branchId', function(req, res, next) {
    stock.deleteStock(req.params.fk_itemId,req.params.fk_branchId, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });


module.exports=router;