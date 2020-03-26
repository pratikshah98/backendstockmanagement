var db=require('../dbconnec'); 
const uuid=require("uuid-random"); 
 
var item={
 

addItem:function(itemt,callback)
{
            //     var todaydate=new Date();
        let u=uuid();
        // console.log(u);
        // return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[u,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
    let promise= new Promise((resolve, reject) => {
        let d=db.query('insert into item (itemId,name,gsm,size,minimumRate,reorderLevel,fkSupplierEmailId) values(?,?,?,?,?,?,?)',[u,itemt.name,itemt.gsm,itemt.size,itemt.minimumRate,itemt.reorderLevel,itemt.fkSupplierEmailId])
        if(d) resolve(d);
        else reject(d);
    });
    promise.then(function(res){
        return callback(false,u);
    
    },
    function(rej){
        // let r=db.query("Select branchId from branch where branchId=?",u);
        // console.log(r.values);
     return callback(rej,false);
        // return db.query(r.values,callback);  
    });
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