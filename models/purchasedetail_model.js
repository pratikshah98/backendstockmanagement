var db=require('../dbconnec');
var purchasedetail={
    getAllPurDetail:function(callback){
        return db.query('select * from purchasedetails',callback);
    },
    addPurDetail:function(item,callback){
        return db.query("insert into purchasedetails values(?,?,?)",[item.fkPurchaseId,item.fkItemId,item.purchaseQuantity],callback);
    },
    deletePurDetail:function(id,callback){
        return db.query("delete from purchasedetails where fkPurchaseId=?",[id],callback);
    },
   
    getPurDetailbyid:function(id,callback){
        return db.query("select * from purchasedetails  where fkPurchaseId=?",[id],callback);
    },
    updatePurDetail:function(id,item,callback){

        return db.query("update purchasedetails set fkItemId=?,purchaseQuantity=? where fkPurchaseId=?",[item.fkItemId,item.purchaseQuantity,id],callback);
    },
    purchasedetailAndItemjoinbyid:function(id,callback)
    {
        return db.query("select * from purchasedetails join purchase on (purchase.purchaseId=purchasedetails.fkPurchaseId) join item on(item.itemId=purchasedetails.fkItemId) where fkPurchaseId=?",[id],callback);   
    }

};
module.exports=purchasedetail;