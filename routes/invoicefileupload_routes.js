var express = require("express");
var router = express.Router();
var multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  ".pdf");  
    //  console.log(file.fieldname);
    }
  })
   
  var upload = multer({ storage: storage }).single('filename'); 


 
router.post('/', function (req, res) {
  console.log(req.files);
  upload(req, res, function (err,rows) {
   // console.log(rows);
    if (err ) {
   
    }
    res.json({
        success:true,
        message:'image uploaded..'
    }); 
  })
});
module.exports=router;

