var db=require('../dbconnec');
var purchasedetail={
    getAllPurDetail:function(callback){
       // return db.query('select * from purchasedetails',callback);
       return db.query('select pd.*,i.*,p.* from purchasedetails pd,item i,purchase p where pd.fkPurchaseId=p.purchaseId And pd.fkItemId=i.itemId',callback);
    },
    addPurDetail:function(item,callback){
        return db.query("insert into purchasedetails values(?,?,?)",[item.fkPurchaseId,item.fkItemId,item.purchaseQuantity],callback);
    },
    deletePurDetail:function(id,callback){
        return db.query("delete from purchasedetails where fkPurchaseId=?",[id],callback);
    },
   
    getPurDetailbyid:function(id,callback){
        return db.query("select pd.*,i.*,p.* from purchasedetails pd,item i,purchase p where pd.fkPurchaseId=p.purchaseId And pd.fkItemId=i.itemId and fkPurchaseId=?",[id],callback);
    },
    updatePurDetail:function(id,item,callback){

        return db.query("update purchasedetails set fkItemId=?,purchaseQuantity=? where fkPurchaseId=?",[item.fkItemId,item.purchaseQuantity,id],callback);
    },
    purchasedetailAndItemjoinbyid:function(id,callback)
    {
        return db.query("select * from purchasedetails p,item i where p.fkItemId=i.itemId and  p.fkPurchaseId=?",[id],callback);   
    }

};
module.exports=purchasedetail;