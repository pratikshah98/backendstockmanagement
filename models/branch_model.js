var db=require('../dbconnec'); 
 
var branch={
 

addBranch:function(item,callback)
{
    return db.query('insert into branch (branchName,branchAddress,branchPhoneNo) values(?,?,?)',[item.branchName,item.branchAddress,item.branchPhoneNo],callback);
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
