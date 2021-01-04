var mongoose=require("mongoose");



  var unvanSchema=new mongoose.Schema({
	  isim:String,
	  check:Boolean
  })
module.exports=mongoose.model("Unvan",unvanSchema);