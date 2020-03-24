
var db=require('../dbconnec'); //reference of dbconnection.js
const uuid=require("uuid-random"); 
var sale={
 
    
GetAllSale:function(callback){
 
        
return db.query("Select * from Sale",callback);
} ,

GetAllSaleById:function(sale_saleId,callback){
 
        return db.query("Select * from Sale where saleId=?",[sale_saleId],callback);
        } ,    

addSale:function(item,callback){

        //     var todaydate=new Date();
        // let u=uuid();
        // console.log(u);
        // return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[u,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
        //  return db.query("Select saleId from Sale where saleId=?",u,callback);  

return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[item.saleId,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
},
    
updateSale:function(id,item,callback){
             return db.query("update Sale set salesDate=?,isInvoiceGenerated=?,fkSaleTypeId=?,fkCustomerEmailId=?,fkBranchId=? where saleId=?",[item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId,item.saleId] ,callback)
    },

    deleteSale:function(id,callback){
       
            return db.query("delete from Sale where saleId in (?)",[id],callback);
      } ,
 
getId:function(item,callback)
{
        return db.query("select saleId from Sale where salesDate=? and isInvoiceGenerated=? and fkSaleTypeId=? and fkCustomerEmailId=? and fkBranchId=?",[item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
}
  
}
 module.exports=sale;
