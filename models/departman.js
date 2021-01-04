var mongoose=require("mongoose");



  var departmanSchema=new mongoose.Schema({
	  isim:String, 
	  zimmet:[{
		  type: mongoose.Schema.Types.ObjectId,
		       ref:"Zimmet"
	  }],
	
	  check:Boolean,
  })
module.exports=mongoose.model("Departman",departmanSchema);