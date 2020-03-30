var db=require('../dbconnec'); 

 
var reorder={
   

getitemforreorder:function(bid,callback)
{
    return db.query("select * from item join stock on (item.itemId=stock.fkItemId) join branch on (stock.fkBranchId=branch.branchId) join User on (User.fkBranchId=branch.branchId) join role on (role.roleId=User.fkRoleId) where stock.stockQuantity<=item.reorderLevel and branch.branchId=? group by branch.branchId ",[bid],callback)
}

};


module.exports=reorder;
