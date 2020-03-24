var saledetail = require("../models/saledetail_model");
var express = require("express");
var router = express.Router();

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
  saledetail.addSalesdetail(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
