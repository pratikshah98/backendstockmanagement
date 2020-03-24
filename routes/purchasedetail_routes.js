var purchasedetail = require("../models/purchasedetail_model");
var express = require("express");
var router = express.Router();

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
  purchasedetail.addPurDetail(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
