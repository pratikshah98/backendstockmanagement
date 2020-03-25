var db=require('../dbconnec');
var saledetail={
    getAllSalesdetail:function(callback){
        return db.query('select * from salesdetails',callback);
    },
    addSalesdetail:function(item,callback){
        return db.query("insert into salesdetails values(?,?,?,?)",[item.fkSaleId,item.fkItemId,item.creditRate,item.saleQuantity],callback);
    },
    deleteSalesdetail:function(sid,callback){
        return db.query("delete from salesdetails where fkSaleId=?",[sid],callback);
    },
   
    getSalesdetailbyid:function(sid,callback){
        return db.query("select * from salesdetails where fkSaleId=?",[sid],callback);
    },
    updateSalesdetail:function(sid,item,callback){

        return db.query("update salesdetails set fkItemId=?,creditRate=?,saleQuantity=? where fkSaleId=?",[item.fkItemId,item.creditRate,item.saleQuantity,sid],callback);
    },
    saledetailAndItemjoinbyid:function(id,callback)
    {
        return db.query("select * from salesdetails s,item i where s.fkItemId=i.itemId and  s.fkSaleId=?",[id],callback);     
    },
    salejoinbycustomerid:function(id,callback){
        return db.query("select sd.fkItemId,sum(sd.saleQuantity) from Sale s,salesdetails sd where s.saleId=sd.fkSaleId and s.fkCustomerEmailId=? GROUP BY sd.fkItemId",[id],callback);
    }

};
module.exports=saledetail;
