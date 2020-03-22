var db=require('../dbconnec'); //reference of dbconnection.js
 
var User={
 
getLogin:function(item,callback){
                console.log(item);
        return db.query("Select * from User where userEmailId=? And userPassword=?",[item.userEmailId,item.userPassword],callback);
                   
},
        
GetAllUser:function(callback){
 
return db.query("Select * from User",callback);
} ,

GetAllUserById:function(user_emailId,callback){
 
        return db.query("Select * from User where userEmailId=?",[user_emailId],callback);
        } ,
        
AddUser:function(item,callback){
            return db.query("insert into User(userEmailId,userName,userPassword,userAddress,userPhoneNo,fkRoleId,fkBranchId) values(?,?,?,?,?,?,?)",[item.userEmailId,item.userName,item.userPassword,item.userAddress,item.userPhoneNo,item.fkRoleId,item.fkBranchId],callback);
    },
    
    UpdateUser:function(id,item,callback){
             return db.query("update User set userName=?,userPassword=?,userAddress=?,userPhoneNo=?,fkRoleId=?,fkBranchId=? where userEmailId=?",[item.userName,item.userPassword,item.userAddress,item.userPhoneNo,item.fkRoleId,item.fkBranchId,id],callback)
    },

    DeleteUser:function(id,callback){
       
            return db.query("delete from User where userEmailId in (?)",[id],callback);
      } ,
      getBranchAndRoleName:function(callback)
      {
        return db.query("Select u.*,r.*,b.* from User u,branch b,role r where r.roleId=u.fkRoleID and b.branchId=u.fkBranchId",callback);     
      }
 
//     DeleteAllUser:function(item,callback){
//             var delarr=[];
//             for(i=0;i<item.length;i++)
//             {
//                 delarr[i]=item[i].user_id;
//             }
//         return db.query("delete from user_tbl where user_id in (?)",[delarr],callback);
//         },
    
    
  
}
 module.exports=User;
