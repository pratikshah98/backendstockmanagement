var saledetailreport = require("../models/report_model");
var express = require("express");
var router = express.Router();

router.get('/:itemId',function(req, res, next) {
    saledetailreport.getSaleDetailsbypassingmonth(req.params.itemId,function(err, rows) {
      if (err) {
        
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
router.get('/:itemId/:branchId',function(req, res, next) {
    saledetailreport.getSaleDetailsbypassingmonthand_Branchid(req.params.itemId,req.params.branchId,function(err, rows) {
      if (err) {
        
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
   
  
  module.exports = router;



