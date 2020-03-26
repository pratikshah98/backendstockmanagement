var db=require('../dbconnec'); 
const uuid=require("uuid-random"); 
 
var branch={
    addBranch:function(item,callback)
    {
             
            let u=uuid();
           
        let promise= new Promise((resolve, reject) => {
            let d=db.query('insert into branch (branchId,branchName,branchAddress,branchPhoneNo) values(?,?,?,?)',[u,item.branchName,item.branchAddress,item.branchPhoneNo]);
            if(d) resolve(d);
            else reject(d);
        });
        promise.then(function(res){
            return callback(false,u);
        
        },
        function(rej){
           
         return callback(rej,false);
           
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
