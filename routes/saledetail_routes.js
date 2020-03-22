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
router.get('/:sid/:iid',function(req, res, next) {
  saledetail.getSalesdetailbyid(req.params.sid,req.params.iid,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:sid/:iid", function(req, res, next) {
  saledetail.deleteSalesdetail(req.params.sid,req.params.iid, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:sid/:iid", function(req, res, next) {
  saledetail.updateSalesdetail(req.params.sid,req.params.iid,req.body, function(err, rows) {
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
