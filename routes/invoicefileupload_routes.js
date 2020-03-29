var express = require("express");
var router = express.Router();
var multer=require('multer');
var fs = require('fs');
var mv=require('mv');
var formidable = require('formidable');

 
router.post('/', function (req, res) {
  var form=new formidable.IncomingForm();
  form.parse(req,function(err, fields, files){
                       let myfile=files.filename.name;
                       let oldpath=files.filename.path;
                       let newpath='./public/uploads/'+myfile;
                       mv(oldpath,newpath,function(err){
                           if(err) next(createError(500));
                           else {
                             res.send("Done");
                             res.end();
                           } 
                       });
    });
 
});
module.exports=router;

