var db=require('../dbconnec');
var purchasedetail={
    getAllPurDetail:function(callback){
        return db.query('select * from purchasedetails',callback);
    },
    addPurDetail:function(item,callback){
        return db.query("insert into purchasedetails values(?,?,?)",[item.fkPurchaseId,item.fkItemId,item.purchaseQuantity],callback);
    },
    deletePurDetail:function(id,id1,callback){
        return db.query("delete from purchasedetails where fkPurchaseId=? AND fkItemId=?",[id,id1],callback);
    },
   
    getPurDetailbyid:function(id,id1,callback){
        return db.query("select * from purchasedetails  where fkPurchaseId=? AND fkItemId=?",[id,id1],callback);
    },
    updatePurDetail:function(id,id1,item,callback){

        return db.query("update purchasedetails set purchaseQuantity=? where fkPurchaseId=? AND fkItemId=?",[item.purchaseQuantity,id,id1],callback);
    }

};
module.exports=purchasedetail;