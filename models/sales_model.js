var db=require('../dbconnec'); //reference of dbconnection.js
 
var sale={
 
    
GetAllSale:function(callback){
 
return db.query("Select * from Sale",callback);
} ,

GetAllSaleById:function(sale_saleId,callback){
 
        return db.query("Select * from Sale where saleId=?",[sale_saleId],callback);
        } ,
        
addSale:function(item,callback){

            var todaydate=new Date();
            return db.query("insert into Sale(salesDate,isInvoiceGenerated,fk_saleTypeId,fk_customer_emailId) values(?,?,?,?)",[todaydate,item.isInvoiceGenerated,item.fk_saleTypeId,item.fk_customer_emailId],callback);
    },
    
updateSale:function(id,item,callback){
             return db.query("update Sale set salesDate=?,isInvoiceGenerated=?,fk_saleTypeId=?,fk_customer_emailId=? where saleId=?",[item.salesDate,item.isInvoiceGenerated,item.fk_saleTypeId,item.fk_customer_emailId,item.saleId] ,callback)
    },

    deleteSale:function(id,callback){
       
            return db.query("delete from Sale where saleId in (?)",[id],callback);
      } ,
 

  
}
 module.exports=sale;
