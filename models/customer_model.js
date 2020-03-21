var db=require('../dbconnec'); 
 
var customer={
 

addCustomer:function(item,callback)
{
    return db.query("insert into customer values(?,?,?,?,?)",[item.customer_emailId,item.customer_name,item.customer_address,item.customer_phoneNo,item.customer_gstno],callback);
},
getAllCustomer:function(callback)
{
    return db.query("select * from customer",callback);
},
getCustomerByid:function(id,callback){
 
    return db.query("select * from customer where customer_emailId=?",[id],callback);
     
},
updateCustomer:function(id,item,callback){

        return db.query("update customer set customer_name=?,customer_address=?,customer_phoneNo=?,customer_gstno=? where customer_emailId=?",[item.customer_name,item.customer_address,item.customer_phoneNo,item.customer_gstno,item.customer_emailId],callback);
},
deleteCustomer:function(id,callback){
    return db.query("delete from customer where customer_emailId=?",[id],callback);
}


};


module.exports=customer;
