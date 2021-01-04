var mongoose=require("mongoose");



  var urunturuSchema=new mongoose.Schema({
	  isim:String
	 
	  
  })
module.exports=mongoose.model("Urunturu",urunturuSchema);