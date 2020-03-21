var db=require('../dbconnec'); //reference of dbconnection.js
 
var User={
 
getLogin:function(item,callback){
                console.log(item);
        return db.query("Select * from User where user_emailId=? And user_password=?",[item.user_emailId,item.user_password],callback);
                   
},
        
GetAllUser:function(callback){
 
return db.query("Select * from User",callback);
} ,

GetAllUserById:function(user_emailId,callback){
 
        return db.query("Select * from User where user_emailId=?",[user_emailId],callback);
        } ,
        
AddUser:function(item,callback){
            return db.query("insert into User(user_emailId,user_name,user_password,user_address,user_phoneNo,fk_roleId,fk_branchId) values(?,?,?,?,?,?,?)",[item.user_emailId,item.user_name,item.user_password,item.user_address,item.user_phoneNo,item.fk_roleId,item.fk_branchId],callback);
    },
    
    UpdateUser:function(id,item,callback){
             return db.query("update User set user_name=?,user_password=?,user_address=?,user_phoneNo=?,fk_roleId=?,fk_branchId=? where user_emailId=?",[item.user_name,item.user_password,item.user_address,item.user_phoneNo,item.fk_roleId,item.fk_branchId,id],callback)
    },

    DeleteUser:function(id,callback){
       
            return db.query("delete from User where user_emailId in (?)",[id],callback);
      } ,
 
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
