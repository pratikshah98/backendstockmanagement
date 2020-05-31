var saledetail = require("../models/saledetail_model");
var express = require("express");
var router = express.Router();
var db=require('../dbconnec'); //reference of dbconnection.js

router.get('/',function(req,res,next){
 
    saledetail.getAllSalesdetail(function(err,rows){
     
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
router.get('/:sid',function(req, res, next) {
  saledetail.getSalesdetailbyid(req.params.sid,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:sid", function(req, res, next) {
  saledetail.deleteSalesdetail(req.params.sid, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:sid", function(req, res, next) {
  saledetail.updateSalesdetail(req.params.sid,req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function(req, res, next) {
  db.query("select * from Stock where fkItemId=? and fkBranchId=?",[req.body.fkItemId,req.body.branchId],function(err1,result1,fields1){
      let newStock=result1[0].stockQuantity - req.body.saleQuantity;
      console.log("Inside saleDetails "+result1[0]);
      db.query("update Stock set stockQuantity=? where fkItemId=? and fkBranchId=?",[newStock,req.body.fkItemId,req.body.branchId],function(err2,result2,fields2){
        saledetail.addSalesdetail(req.body, function(err, rows) {
          if (err) {
            res.json(err);
          } else {
      
              res.json(rows);
            // console.log("sale detail"+rows);      
          }
        });
      });
  });
  
});

module.exports = router;
