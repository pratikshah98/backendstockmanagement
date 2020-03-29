var db=require('../dbconnec'); 

 
var report={
GetSaleReportBetweenDatePassedBranch_id:function(sd,ed,bid,callback){
    

    return db.query("select f.name, SUM(f.saleQuantity) as Quantity from (select i.name,sd.saleQuantity,s.fkBranchId from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId where s.fkBranchId=? and s.salesDate BETWEEN ? and ?) as f group by(f.name)",[bid,sd,ed],callback);
     
},
GetSaleReportBetweenDatePassed:function(sd,ed,callback){
    return db.query("select f.name, SUM(f.saleQuantity) as Quantity from (select i.name,sd.saleQuantity,s.fkBranchId from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId where s.salesDate BETWEEN ? and ?) as f group by(f.name)",[sd,ed],callback);
     
},
GetPurchaseReportBetweenDatePassedBranch_id:function(sd,ed,bid,callback){
    

    return db.query("select f.name, SUM(f.purchaseQuantity) as Quantity from (select i.name,pd.purchaseQuantity,p.fkBranchId from purchasedetails as pd join purchase as p on p.purchaseId=pd.fkpurchaseId join item as i on i.itemId=pd.fkItemId where p.fkBranchId=? and p.purchaseDate BETWEEN ? and ?) as f group by(f.name)",[bid,sd,ed],callback);
     
},
GetPurchaseReportBetweenDatePassed:function(sd,ed,callback){
    

    return db.query("select f.name, SUM(f.purchaseQuantity) as Quantity from (select i.name,pd.purchaseQuantity,p.fkBranchId from purchasedetails as pd join purchase as p on p.purchaseId=pd.fkpurchaseId join item as i on i.itemId=pd.fkItemId where p.purchaseDate BETWEEN ? and ?) as f group by(f.name)",[sd,ed],callback);
     
},
GetSaleReportBydateanditempassedbranch_id:function(iid,sd,ed,bid,callback){
    

    return db.query("select f.name,f.salesDate,sum(f.saleQuantity) from (select i.name,s.salesDate,sd.saleQuantity from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId where s.fkBranchId=? and sd.fkItemId=? and s.salesDate BETWEEN ? and ?) as f group by(f.salesDate)",[bid,iid,sd,ed],callback);
     
},
GetSaleReportBydateanditempassed:function(iid,sd,ed,callback){
    

    return db.query("select i.name,s.salesDate,sum(sd.saleQuantity) from salesdetails as sd join sale as s on s.saleId=sd.fkSaleId join item as i on i.itemId=sd.fkItemId where sd.fkItemId=? and s.salesDate BETWEEN ? and ? group by(s.salesDate)",[iid,sd,ed],callback);
     
},
getPurchaseReportbydateanditempassedBranch_id:function(itemId,to,from,branchId,callback)
{
  return db.query("select i.name, sum(pd.purchaseQuantity) as 'purchase',DATE_FORMAT(p.purchasedate, '%d %m %Y') as 'date' from purchasedetails pd join purchase p on p.purchaseId = pd.fkPurchaseId join item i on i.itemId = pd.fkItemId join branch b on b.branchId=? where fkItemId = ? and p.purchaseDate between ? and ? group by p.purchasedate",[branchId,itemId,to,from],callback);       
},
getPurchaseReportbydateanditempassed:function(itemId,to,from,callback)
{
  return db.query("select i.name, sum(pd.purchaseQuantity) as 'purchase',DATE_FORMAT(p.purchasedate, '%d %m %Y') as 'date' from purchasedetails pd join purchase p on p.purchaseId = pd.fkPurchaseId join item i on i.itemId = pd.fkItemId  where fkItemId = ? and p.purchaseDate between ? and ? group by p.purchasedate",[itemId,to,from],callback);       
},
getSaleDetailsbypassingmonth:function(itemId,callback)
      {
          return db.query("select i.name,sum(sd.saleQuantity) as quantity,DATE_FORMAT(sa.salesDate,'%m - %Y') as date from salesdetails sd ,sale sa,item i where sd.fkSaleId = sa.saleId and i.itemId = ? group by date",[itemId],callback);
    },
getSaleDetailsbypassingmonthand_Branchid:function(itemId,branchId,callback)
      {
          return db.query("select i.name,sum(sd.saleQuantity) as quantity,DATE_FORMAT(sa.salesDate,'%m - %Y') as date from salesdetails sd ,sale sa,item i,branch b where b.branchId = ? and sd.fkSaleId = sa.saleId and i.itemId = ? group by date",[branchId,itemId],callback);
    },
    getPurchaseDetailsMonthWise:function(itemId,callback)
    {
     return db.query("select i.name,sum(pd.purchaseQuantity) as quantity,DATE_FORMAT(pu.purchaseDate,'%m - %y') as date from purchasedetails pd ,purchase pu,item i where pd.fkPurchaseId = pu.purchaseId and i.itemId = ? group by date",[itemId],callback);       
  },
  getPurchaseDetailsMonthWiseBranch:function(itemId,branchId,callback)
  {
    return db.query("select i.name,sum(pd.purchaseQuantity) as quantity,DATE_FORMAT(pu.purchaseDate,'%m - %y') as date from purchasedetails pd ,purchase pu,item i,branch b where pd.fkPurchaseId = pu.purchaseId and b.branchId = ? and i.itemId = ? group by date",[branchId,itemId],callback);       
},
stockitem_branchid:function(fk_branchId,callback){
    
return db.query("Select i.name,i.gsm, s.fkitemid as itemId, s.stockquantity as ToatlStock from item i, stock s where i.itemId =s.fkitemId and s.fkbranchId=?  GROUP BY s.fkItemId",[fk_branchId],callback);
},
salereport_passingmonthyear:function(m,y,callback){
    return db.query("SELECT s.salesDate, i.name,sd.saleQuantity FROM SALE s JOIN salesdetails sd ON s.saleId= sd.fkSaleId  JOIN item i ON i.itemId=sd.fkItemId AND MONTH(s.salesDate) = ? AND YEAR(s.salesDate) = ?",[m,y],callback);
  
},
purchasereport_passingmonthyear: function (m,y,callback) {
    return db.query("SELECT p.purchaseDate, i.name,pd.purchaseQuantity FROM purchase p JOIN purchasedetails pd ON p.purchaseId= pd.fkPurchaseId JOIN item i ON i.itemId=pd.fkItemId and MONTH(p.purchaseDate) = ? AND YEAR(p.purchaseDate) = ?", [m,y], callback);
}
};


module.exports=report;
