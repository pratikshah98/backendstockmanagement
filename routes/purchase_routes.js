var purchase = require("../models/purchase_model");
var express = require("express");
var router = express.Router();

router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    purchase.getPurchasebyid(req.params.id,function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    purchase.getAllPurchase(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.delete("/:purchaseId", function(req, res, next) {
  purchase.deletePurchase(req.params.purchaseId, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.put("/:purchaseId", function(req, res, next) {
  purchase.updatePurchase(req.params.purchaseId,req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/", function(req, res, next) {
  purchase.addPurchase(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);

      // purchase.getPurchaseId(req.body,function(err1,rows1){
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
  });
});

module.exports = router;
