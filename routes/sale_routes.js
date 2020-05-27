var sale=require('../models/sales_model');
var express=require('express');
var db=require('../dbconnec'); //reference of dbconnection.js

var router=express.Router();
router.get('/',function(req,res,next){
 
    sale.GetAllSale(function(err,rows){
     
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
router.get('/:saleId',function(req, res, next) {
  sale.GetAllSaleById(req.params.saleId,function(err, rows) {
    if (err) {
      
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post('/',function(req,res,next){
    sale.addSale(req.body,function(err,rows){
      
      if(err)
      {
        console.log(err);
      }
      else
      {
        //console.log(rows);
        res.json(rows);
      //  console.log("id is"+" "+rows.insertId);
        // sale.getId(req.body,function(err1,rows1){
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
      
     //console.log("id is"+" "+rows.insertId);
    }
    
  );

  }


);
  

 
  router.put('/:id?',function(req,res,next){
   sale.updateSale(req.params.id,req.body,function(err,rows){
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
   router.delete('/:id', function(req, res, next) {
    sale.deleteSale(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });
  router.post('/deleteMultiple', function(req, res, next) {
            db.query("delete from Sale where saleId in (?)",[req.body],function(err1,rows){
              if (err1) {
                res.json(err1);
              } else {
                res.json(rows);
              }
            });  
    
  });

  router.post('/cashTally', function(req, res, next) {
    db.query("select * from Sale where fkBranchId = (?)",[req.body.branchId],function(err,result,fields){
      if (err) {
        res.json(err);
      } else {
        // console.log("All Sales"+result[0].data);
        let totalSale=req.body.totalSale;
        let creditSale=[];
        let cashSale=[];
        for(let i=0;i<result.length;i++){
          let date=new Date();
          let currDate=new Date(result[i].salesDate);
          date.setHours(0,0,0,0)
          currDate.setHours(0,0,0,0)
          // console.log("Inside sale id="+result[i].saleId);
          // console.log("Date ="+date);
          // console.log("Date ="+currDate);
          if(!(currDate > date) && !(currDate < date)){
            // console.log("Inside Date.sale Date="+result[i].salesDate);
            if(result[i].fkSaleTypeId=='0040a784-6b5d-11ea-a8c8-ace2d3e54b8b'){
              // console.log("Inside CreditSale.");
              creditSale.push(result[i].saleId);
            }
            else{
              // console.log("Inside CashSale.");
                cashSale.push(result[i].saleId);
            }
          }
        }
        let creditCount=0;
        let cashCount=0;
        db.query("select * from salesdetails where fkSaleId in (?)",[creditSale],function(err1,result1,fields1){
            
            for(let i=0;i<result1.length;i++){
              // console.log("Inside CreditCount for sale id= "+result1[i].fkSaleId+" with qty= "+result1[i].saleQuantity);
              creditCount+=result1[i].saleQuantity;
            }
            db.query("select * from salesdetails where fkSaleId in (?)",[cashSale],function(err2,result2,fields2){
              // console.log("Calculate Cash Sale");
              for(let j=0;j<result2.length;j++){
                // console.log("Inside CashCount for sale id= "+result2[j].fkSaleId+" with qty= "+result2[j].saleQuantity);
                cashCount+=result2[j].saleQuantity;
              }
              let final = (totalSale + cashCount) - creditCount ; 
                db.query("update branch set cash= ? where branchId= ?",[final,req.body.branchId],function(err3,result3){
                res.send("Done = "+final);
              });
            });  
        });
      }
    });  

});


module.exports=router;