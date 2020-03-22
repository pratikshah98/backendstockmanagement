var db=require('../dbconnec'); 
 
var item={
 

addItem:function(itemt,callback)
{
    return db.query('insert into item (name,gsm,size,minimumRate,reorderLevel,fkSupplierEmailId) values(?,?,?,?,?,?)',[itemt.name,itemt.gsm,itemt.size,itemt.minimumRate,itemt.reorderLevel,itemt.fkSupplierEmailId],callback);
},
getAllItem:function(callback)
{
    return db.query("select * from item",callback);
},
getItemByid:function(id,callback){ 
    return db.query("select * from item where itemId=?",[id],callback);     
},
updateItem:function(id,itemt,callback){
    return db.query("update item set name=?,gsm=?,size=?,minimumRate=?,reorderLevel=?,fkSupplierEmailId=? where itemId=?",[itemt.name,itemt.gsm,itemt.size,itemt.minimumRate,itemt.reorderLevel,itemt.fkSupplierEmailId,itemt.itemId],callback);
},
deleteItem:function(id,callback){
    return db.query("delete from item where itemId=?",[id],callback);
}


};


module.exports=item;