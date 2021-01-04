var mongoose=require("mongoose");



  var kisiSchema=new mongoose.Schema({
	  isim:String,
	  lokasyon:String,
	  tc:String,
	  numara:String,
	  zimmet:[{
		      type: mongoose.Schema.Types.ObjectId,
		       ref:"Zimmet"
	  }],
	  departman:String,
	  unvan:String
	  ,
	  dogum:String,
	  is_giris:String,
	 
	  is_cikis:String,
	  email:String,
	  adres:String,
	  aciklama:String,
	  condition:Boolean,
	
  })
module.exports=mongoose.model("Kisi",kisiSchema);