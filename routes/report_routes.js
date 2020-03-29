var report=require('../models/report_model');
var express=require('express');
var router=express.Router();
router.get('/:sd/:ed/:bid',function(req, res, next) {
  report.GetSaleReportBetweenDatePassedBranch_id(req.params.sd,req.params.ed,req.params.bid,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/:sd/:ed',function(req, res, next) {
  report.GetSaleReportBetweenDatePassed(req.params.sd,req.params.ed,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});




module.exports=router;