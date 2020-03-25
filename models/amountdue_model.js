var db=require('../dbconnec');
var amount={
    getAllAmountDue:function(callback){
        return db.query('select * from amountdue',callback);
    },
    addAmountDue:function(item,callback){
        //let transactionDate = new Date();
        return db.query("insert into amountdue values(?,?,?,?,?)",[item.fkCustomerEmailId,item.transactionDate,item.amountDue,item.amountPaid,item.description],callback);
    },
    deleteAmountDue:function(id,callback){
        return db.query("delete from amountdue where fkCustomerEmailId=?",[id],callback);
    },
   
    getAmountDueById:function(id,callback){
        return db.query("select * from amountdue where fkCustomerEmailId=?",[id],callback);
    },
    updateAmountDue:function(id,item,callback){
        
        //let transactionDate = new Date();
        return db.query("update amountdue set transactionDate=?,amountDue=?,amountPaid=?,description=? where fkCustomerEmailId=?",[item.transactionDate,item.amountDue,item.amountPaid,item.description,id],callback);
    }

};
module.exports=amount;
//fk_customer_emailId	transactionDate	amountDue	amountPaid