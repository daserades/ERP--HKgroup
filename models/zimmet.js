var mongoose=require("mongoose");




  var zimmetSchema=new mongoose.Schema({
	  
	  zim_bas:String,
	  zim_bit:String,
	  serino:String,
	  adet:Number,
	  modelid:String,
	  status:Boolean,
	  
      aciklama:String
	  
  })
module.exports=mongoose.model("Zimmet",zimmetSchema);