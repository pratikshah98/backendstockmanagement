var db=require('../dbconnec'); //reference of dbconnection.js
 
var invoice={
getInvoice:function(callback)
{
return db.query("select * from invoice join customer on (invoice.fkCustomerEmailId=customer.customerEmailId)",callback);
},
getInvoiceById:function(Id,callback){
 
    return db.query("select * from invoice join customer on (invoice.fkCustomerEmailId=customer.customerEmailId) and fkCustomerEmailId=?",[Id],callback);
  },
    
addInvoice:function(item,callback){
    return db.query("insert into invoice(invoiceName,invoiceDate,fkCustomerEmailId) values(?,?,?)",[item.invoiceName,item.invoiceDate,item.fkCustomerEmailId],callback);
},

 


}
 module.exports=invoice;
