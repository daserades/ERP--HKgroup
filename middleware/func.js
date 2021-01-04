var middleWareObj={};

	
var User=require("../models/user");



middleWareObj.isLoggedIn=function(req,res,next){//bu fonk yaziyoruz kullanicinin sayfasini kontrol ediyoruz girdimi girmedimi diye callback den hemen once yukarda
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/");
		
	}
}
middleWareObj.isLogged=function(req,res,next){//bu fonk yaziyoruz kullanicinin sayfasini kontrol ediyoruz girdimi girmedimi diye callback den hemen once yukarda
	if(!req.user){
		return next();
	}
	else{
		res.redirect("/personel");
		
	}
}


module.exports=middleWareObj;