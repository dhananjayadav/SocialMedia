const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Dhananjay:abcd1234@cluster0.ck5egdq.mongodb.net/socialmedia?retryWrites=true&w=majority"
  )
  .then(function () {
    console.log("database connected");
  })
  .catch(function (err) {
    console.log(err);
  });
