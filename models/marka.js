var mongoose=require("mongoose");



  var markaSchema=new mongoose.Schema({
	  isim:String
	 
	  
  })
module.exports=mongoose.model("Marka",markaSchema);