var reorder = require("../models/reorderstock_model");
var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/:bid", function (req, res, next) {
  reorder.getitemforreorder(req.params.bid, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      //res.json(rows);
      //console.log(rows);
      for (i = 0; i < rows.length; i++) {
        // console.log(rows[i]);
        var transporter = nodemailer.createTransport({
          service: "gmail",

          auth: {
            user: "dhairyajariwala26@gmail.com",

            pass: "abcdEfg@12",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        var mailOptions = {
          from: "dhairyajariwala26@gmail.com",

          to: "dhairyajariwala26@gmail.com",

          subject:
            "Reminder for re-ordering items (" +
            rows[i].branchName +
            " Branch)",

          //text:rows[i].itemId,
          html:
            " <h2>The following items are below the reorder level in " +
            rows[i].branchName +
            " branch :</h2> <br>" +
            '<table border style="border:1px solid black;"> ' +
            "<tr>" +
            "<th>  Item Name      </th>" +
            "<th>  GSM  </th>" +
            "<th>  Size  </th>" +
            "<th>  Current Stock  </th>" +
            "</tr>" +
            "<tr>" +
            "<td>" +
            rows[i].name +
            "</td>" +
            "<td>" +
            rows[i].gsm +
            "</td>" +
            "<td>" +
            rows[i].size +
            "</td>" +
            "<td>" +
            rows[i].stockQuantity +
            "</td>" +
            "</tr>" +
            "</table>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      res.send("Done");
    }
  });
});

module.exports = router;
