var saledetail = require("../models/saledetail_model");
var express = require("express");
var router = express.Router();
var db = require("../dbconnec"); //reference of dbconnection.js

router.get("/", function (req, res, next) {
  saledetail.getAllSalesdetail(function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get("/:sid", function (req, res, next) {
  saledetail.getSalesdetailbyid(req.params.sid, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.delete("/:sid", function (req, res, next) {
  saledetail.deleteSalesdetail(req.params.sid, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);}
    }); 
  // db.query("select * from sale where saleId=?",[req.params.sid],function (err, result, fields) {
  //     if(result){
  //       // console.log("---"+ result[0]);
  //       db.query("select * from salesdetails where fkSaleId = ?",[req.params.sid],function(err1,result1,fields1){
  //         if(result1){
  //           // console.log("---"+ result[0]);
  //           let myBranch=result[0].fkBranchId;
  //           let stockUsage=[];
  //           for(let i=0;i<result1.length;i++){
  //             stockUsage.push({
  //               itemId:result1[i].fkItemId,
  //               branchId:myBranch,
  //               stock:result1[i].saleQuantity
  //             });  
  //           }
  //           db.query("select * from stock where fkBranchId = ?",myBranch,function(err2,result2,fields2){
  //             if(result2){
  //               for(let j=0;j<result2.length;j++){
  //                 for(let z=0;z<stockUsage.length;z++){
  //                     if(result2[j].fkItemId==stockUsage[z].itemId){
  //                       stockUsage[z].stock=result2[j].stockQuantity + stockUsage[z].stock; 
  //                     }
  //                 }
  //               } 
  //               let y=0;
  //               while(  y < stockUsage.length  ) {
  //                 let item = stockUsage[y].itemId;
  //                 let branch=myBranch;
  //                 let final=stockUsage[y].stock;
  //                 //some manipulation of someArr[i]
  //                 // (function(val1,val2,val3){
  //                   let promise2 = new Promise((resolve2,reject3)=>{
  //                   db.query( "update stock set stockQuantity = ? where fkItemId=? and fkBranchId = ? ",[val1,val2,val3], function(err3, rows3, fields3) {
  //                       if ( err ) {
  //                         console.log( err );
  //                       } else {
  //                         // console.log("ss "+final);
  //                         resolve('Done');
  //                         // output.push( rows[0].someVal );//push query output to this variable
  //                       }
  //                   });
  //                 });
  //                 promise2.then((resolve2)=>{
  //                   if(resolve2=='Done'){
  //                     y++;
  //                   }
  //                 });

  //                 // })(final,item,branch);
  //               }
  //               if(y==stockUsage.length){
  //                 res.json(rows);
  //               }

  //             }  
  //           });
  //         }  
  //       });    
  //     }
  //       });
  //     }
  //   });
});

router.put("/:sid", function (req, res, next) {
  saledetail.updateSalesdetail(req.params.sid, req.body, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function (req, res, next) {
  saledetail.addSalesdetail(req.body, function (err4, rows4) {
    // console.log("Inside 2");
    if (err4) {
      res.json(err4);
    } else {
    
      // console.log("sale detail"+rows);
    
  db.query(
    "select * from Stock where fkItemId=? and fkBranchId=?",
    [req.body.fkItemId, req.body.branchId],
    function (err1, result1, fields1) {
        console.log(req.body);
        let newStock = result1[0].stockQuantity - req.body.saleQuantity;
        console.log("Inside saleDetails " + result1[0]);
        db.query(
          "update Stock set stockQuantity=? where fkItemId=? and fkBranchId=?",
          [newStock, req.body.fkItemId, req.body.branchId],
          function (err2, result2, fields2) {
            if(result2){
              console.log("Inside 1");
              res.json(rows4);
            }
          }
        );
    }
  );
}
});
});

module.exports = router;
