var db=require('../dbconnec'); //reference of dbconnection.js
 
var stock={
 
    
GetAllStock:function(callback){
 
return db.query("Select * from Stock",callback);
} ,

GetAllStockById:function(stock_stockQuantity,callback){
 
        return db.query("Select * from Stock where stock_stockQuantity=?",[stock_stockQuantity],callback);
        } ,
        
AddStock:function(item,callback){
            return db.query("insert into Stock(stock_stockQuantity,fk_itemId,fk_branchId) values(?,?,?)",[item.stock_stockQuantity,fk_itemId,fk_branchId],callback);
    },
    
    UpdateStock:function(id,item,callback){
             return db.query("update Stock set stock_stockQuantity=?,fk_itemId=?,fk_branchId=? where stock_stockQuantity=?",[item.stock_stockQuantity,fk_itemId,fk_branchId] ,callback)
    },

    DeleteSale:function(id,callback){
       
            return db.query("delete from Sale where stock_stockQuantity in (?)",[id],callback);
      } ,
 

    
    
  
}
 module.exports=stock;
