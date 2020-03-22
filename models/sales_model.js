var db=require('../dbconnec'); //reference of dbconnection.js
 
var sale={
 
    
GetAllSale:function(callback){
 
return db.query("Select * from Sale",callback);
} ,

GetAllSaleById:function(sale_saleId,callback){
 
        return db.query("Select * from Sale where saleId=?",[sale_saleId],callback);
        } ,
        
addSale:function(item,callback){

        //     var todaydate=new Date();
            return db.query("insert into Sale(salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?)",[item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
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
