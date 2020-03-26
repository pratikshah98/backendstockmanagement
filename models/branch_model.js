var db=require('../dbconnec'); 
const uuid=require("uuid-random"); 
 
var branch={
 

addBranch:function(item,callback)
{
    let u=uuid();
    // console.log(u);
    // return db.query("insert into Sale(saleId,salesDate,isInvoiceGenerated,fkSaleTypeId,fkCustomerEmailId,fkBranchId) values(?,?,?,?,?,?)",[u,item.salesDate,item.isInvoiceGenerated,item.fkSaleTypeId,item.fkCustomerEmailId,item.fkBranchId],callback);
let promise= new Promise((resolve, reject) => {
    let d=db.query('insert into branch (branchId,branchName,branchAddress,branchPhoneNo) values(?,?,?,?)',[u,item.branchName,item.branchAddress,item.branchPhoneNo]);
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
getAllBranch:function(callback)
{
    return db.query("select * from branch",callback);
},
getBranchByid:function(id,callback){
 
    return db.query("select * from branch where branchId=?",[id],callback);
     
},
updateBranch:function(id,item,callback){

    return db.query("update branch set branchName=?,branchAddress=?,branchPhoneNo=? where branchId=?",[item.branchName,item.branchAddress,item.branchPhoneNo,item.branchId],callback);
},
deleteBranch:function(id,callback){
    return db.query("delete from branch where branchId=?",[id],callback);
}



};


module.exports=branch;
