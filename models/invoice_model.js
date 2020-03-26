var db=require('../dbconnec'); //reference of dbconnection.js
 
var invoice={
getInvoice:function(callback)
{
return db.query("select i.*,c.* from invoice i,customer c where i.fkCustomerEmailId=c.customerEmailId",callback);
},
getInvoiceById:function(Id,callback){
 
    return db.query("Select i.*,c.* from invoice i,customer c where i.fkCustomerEmailId=c.customerEmailId and fkCustomerEmailId=?",[Id],callback);
  },
    
addInvoice:function(item,callback){
    return db.query("insert into invoice(invoiceName,invoiceDate,fkCustomerEmailId) values(?,?,?)",[item.invoiceName,item.invoiceDate,item.fkCustomerEmailId],callback);
},

 


}
 module.exports=invoice;
