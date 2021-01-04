var mongoose=require("mongoose");



  var modelSchema=new mongoose.Schema({
	  isim:String,
	  urun_turu:String,
	  marka:String,
      aciklama:String,
	  
	  
  })
module.exports=mongoose.model("Model",modelSchema);