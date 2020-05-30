var purchasedetail = require("../models/purchasedetail_model");
var express = require("express");
var router = express.Router();
var db=require('../dbconnec'); //reference of dbconnection.js

router.get('/',function(req,res,next){
 
    purchasedetail.getAllPurDetail(function(err,rows){
     
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
router.get('/:pid',function(req, res, next) {
  purchasedetail.getPurDetailbyid(req.params.pid,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:purchaseId", function(req, res, next) {
  purchasedetail.deletePurDetail(req.params.purchaseId, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:purchaseId", function(req, res, next) {
  purchasedetail.updatePurDetail(req.params.purchaseId,req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", function(req, res, next) {
  db.query("select * from Stock where fkItemId=? and fkBranchId=?",[req.body.fkItemId,req.body.branchId],function(err1,result1,fields1){
    let newStock=result[0].stockQuantity + req.body.saleQuantity;
    db.query("update Stock set stockQuantity=? where fkItemId=? and fkBranchId=?",[newStock,req.body.fkItemId,req.body.branchId],function(err1,result1,fields1){
      purchasedetail.addPurDetail(req.body, function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    });
});
  
});

module.exports = router;
