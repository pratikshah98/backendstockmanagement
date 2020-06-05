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
        console.log(rows);
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
        let stockUsage=req.body.stockUsage;
        let itemIds=[];
        for(let i=0;i<stockUsage.length;i++){
          itemIds.push(stockUsage[i].fkItemId);
        }
        db.query("select * from item where itemId in (?)",[itemIds],function(err11,result11,fields11){
          if (err11) {
            res.json(err11);
          } else {
            let totalPrice=0;
            if(result11.length>0){
              for(let x=0;x<stockUsage.length;x++){
                for(let y=0;y<stockUsage.length;y++){
                  if(result11[x].itemId==stockUsage[y].fkItemId){
                    totalPrice+=result11[x].minimumRate * stockUsage[y].stockQuantity;
                    break;  
                  }
                }
              }
            }  
              let creditSale=[];
              let cashSale=[];
              let creditCount=0;
              let cashCount=0;
              if(result.length>0){
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
                db.query("select * from salesdetails as s join item as i on (s.fkItemId=i.itemId) where s.fkSaleId in (?)",[creditSale],function(err1,result1,fields1){
                  if(result1.length>0){
                    for(let i=0;i<result1.length;i++){
                      creditCount+=result1[i].saleQuantity*result1[i].minimumRate;
                      console.log("Inside CreditCount for sale id= "+result1[i].fkSaleId+" with qty= "+creditCount);
                    }
                  }
                });  
                db.query("select * from salesdetails as s join item as i on (s.fkItemId=i.itemId) where s.fkSaleId in (?)",[cashSale],function(err2,result2,fields2){
                  // console.log("Calculate Cash Sale");
                  if(result2.length>0){
                    for(let j=0;j<result2.length;j++){ 
                      cashCount+=result2[j].saleQuantity*result2[j].minimumRate;
                      console.log("Inside CashCount for sale id= "+result2[j].fkSaleId+" with qty= "+cashCount);
                    }
                  }
                });  
              }
              
                    let final= (totalPrice + cashCount) - creditCount ; 
                      db.query("update branch set cash= ? where branchId= ?",[final,req.body.branchId],function(err3,result3){
                      res.send("Done = "+final);
                    });
          }
        });
      }
    });  

});


module.exports=router;