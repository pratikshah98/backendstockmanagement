var db=require('../dbconnec'); //reference of dbconnection.js
 
var stock={
 
    
GetAllStock:function(callback){
 
return db.query("Select * from Stock",callback);
} ,

GetAllStockById:function(fk_itemId,fk_branchId,callback){
 
        return db.query("Select * from Stock where fk_itemId=? and fk_branchId=? ",[fk_itemId,fk_branchId],callback);
},
addStock:function(item,callback){
    return db.query("insert into Stock(fk_itemId,fk_branchId,stockQuantity) values(?,?,?)",[item.fk_itemId,item.fk_branchId,item.stockQuantity],callback);
},

updateStock:function(fk_itemId,fk_branchId,item,callback){
    return db.query("update Stock set stockQuantity=? where fk_itemId=? and fk_branchId=? ",[item.stockQuantity,fk_itemId,fk_branchId] ,callback)
},

deleteStock:function(fk_itemId,fk_branchId,callback){

    return db.query("delete from Stock where fk_itemId=? and fk_branchId=? ",[fk_itemId,fk_branchId],callback);
} 

    
    
  
}
 module.exports=stock;
