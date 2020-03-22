var db=require('../dbconnec');
var saledetail={
    getAllSalesdetail:function(callback){
        return db.query('select * from salesdetails',callback);
    },
    addSalesdetail:function(item,callback){
        return db.query("insert into salesdetails values(?,?,?,?)",[item.fkSaleId,item.fkItemId,item.creditRate,item.saleQuantity],callback);
    },
    deleteSalesdetail:function(sid,iid,callback){
        return db.query("delete from salesdetails where fkSaleId=? and fkItemId=?",[sid,iid],callback);
    },
   
    getSalesdetailbyid:function(sid,iid,callback){
        return db.query("select * from salesdetails where fkSaleId=? and fkItemId=?",[sid,iid],callback);
    },
    updateSalesdetail:function(sid,iid,item,callback){

        return db.query("update salesdetails set creditRate=?,saleQuantity=? where fkSaleId=? and fkItemId=?",[item.creditRate,item.saleQuantity,sid,iid],callback);
    }

};
module.exports=saledetail;
