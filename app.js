var express=require("express"),
mongoose=require("mongoose"),
	passport=require("passport"),
	passportLocalMongoose=require("passport-local-mongoose"),
	LocalStrategy=require("passport-local"),
	expressSanitizer = require("express-sanitizer"),
    methodOverride=require("method-override"),
	Kisi=require("./models/kisi.js"),
	Unvan=require("./models/unvan.js"),
	Model=require("./models/model.js"),
	Departman=require("./models/departman.js"),
	middleWare=require("./middleware/func"),
	User=require("./models/user.js"),
	Urunturu=require("./models/urunturu.js"),
	Marka=require("./models/marka.js"),
    Zimmet=require("./models/zimmet.js"),
    app=express();

app.set("view engine","ejs");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/envanter");

//PASSPORT CONFIGURATION
  app.use(require("express-session")({//*
		secret:"Oguzhan Cevik",
		resave:false,
		saveUnitialized:false
		}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//local var
app.use(function(req,res,next){
	res.locals.currentUser=req.user;//currentUser kullnacagimiz variable req.use o anki giren kullanici nesnesi bunun yerine status=1 =0 gibi durumlada yapabilirdik
	
	
	next();//bunu eklemeliyiz yoksa kod diger parcaya gecmez sadece 1 yerde tanimlar ve durur
});
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.set('useFindAndModify', false);





app.get("/newkisi",middleWare.isLoggedIn, function(req, res) {
	var deps;
	Departman.find({},function(err,allDep){
		if(err){
			console.log(err);
			
		}else{
			deps=allDep;
		}
	})
	Unvan.find({},function(err,allUnv){
		if(err){
			console.log(err);
			
		}else{
			
			
			res.render('newkisi',{departman:deps,unvan:allUnv});
		}
	})

});
app.post("/newkisi",middleWare.isLoggedIn,function(req,res){
	var isim=req.body.name,
		lokasyon=req.body.lokasyon,
		tc=req.body.tc,
		numara=req.body.numara,
		//urun
		
		depart=req.body.departman,
		unv=req.body.unvan,
		dogum=req.body.dogum,
		is_giris=req.body.is_giris,
		email=req.body.eposta,
	    adres=req.body.adres,
		aciklama=req.body.aciklama;
		
	Kisi.create({isim:isim,lokasyon:lokasyon,tc:tc,numara:numara,departman:depart,unvan:unv,is_giris:is_giris,email:email,dogum:dogum,adres:adres,aciklama:aciklama,condition:true},function(err,kisi){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/personel");
			console.log(kisi);
		}
	})
	
})
app.put("/personel/pasif/:id",middleWare.isLoggedIn,function(req,res){
	Kisi.findByIdAndUpdate(req.params.id,{condition:false},function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(found);
			res.redirect('/personel');
			
		}
	})
})	
app.get("/newdep",middleWare.isLoggedIn,function(req,res){
	Departman.find({},function(err,alldep){
		if(err){
			console.log(err);
				
		}
		else{
			res.render("newdep",{departman:alldep});
		}
	})
})
//UPDATE ROUTE
app.put("/newdep/:id",middleWare.isLoggedIn,function(req,res){
	
	
	
	Departman.findByIdAndUpdate(req.params.id,{isim:req.body.name,check:req.body.check},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/newdep");
	}
	})
})
app.delete("/newdep/:id",middleWare.isLoggedIn,function(req,res){
	Departman.findByIdAndRemove(req.params.id,function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			res.redirect('/newdep');
			
		}
	})
})	

app.post("/newdep",middleWare.isLoggedIn,function(req,res){
	var isim=req.body.name;
	
	var check=req.body.check;
	
	
	
	Departman.create({isim:isim,check:check},function(err,dep){
		if(err){
			console.log(err);
		}else{
			res.redirect("/newdep");
			console.log(dep);
		}
	})
})

app.get("/newunv",middleWare.isLoggedIn,function(req,res){
	Unvan.find({},function(err,allunv){
		if(err){
			console.log(err);
				
		}
		else{
			res.render("unvan",{unvan:allunv});
		}
	})
	
})


app.post("/newunv",middleWare.isLoggedIn,function(req,res){
	
	var isim=req.body.name;
	
	var check=req.body.check;
	
	
	
	Unvan.create({isim:isim,check:check},function(err,dep){
		if(err){
			console.log(err);
		}else{
			res.redirect("/newunv");
			console.log(dep);
		}
	})
})

//UPDATE ROUTE
app.put("/newunv/:id",middleWare.isLoggedIn,function(req,res){
	
	
	
	Unvan.findByIdAndUpdate(req.params.id,{isim:req.body.name,check:req.body.check},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/newunv");
	}
	})
})
app.delete("/newunv/:id",middleWare.isLoggedIn,function(req,res){
	Unvan.findByIdAndRemove(req.params.id,function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			res.redirect('/newunv');
			
		}
	})
})	



app.get("/personel",middleWare.isLoggedIn,function(req,res){
	Kisi.find({},function(err,allkisi){
		if(err){
			console.log(err);
		}
		else{
			res.render("personel",{personel:allkisi});
		}
		
	})
	
})
app.get("/personel/:id",middleWare.isLoggedIn,function(req,res){
	
	var deps;
	var unv;
	Departman.find({},function(err,allDep){
		if(err){
			console.log(err);
			
		}else{
			deps=allDep;
		}
	})
	Unvan.find({},function(err,allUnv){
		if(err){
			console.log(err);
			
		}else{
			
			
			unv=allUnv;
		}
	})
	Kisi.findById(req.params.id,function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			res.render("editkisi",{kisi:found,unvan:unv,departman:deps});
		}
	})
	
})

app.put("/personel/:id",middleWare.isLoggedIn,function(req,res){
	

	
	var isim=req.body.name,
		lokasyon=req.body.lokasyon,
		tc=req.body.tc,
		numara=req.body.numara,
		//urun
		depart=req.body.departman,
		unv=req.body.unvan,
		dogum=req.body.dogum,
		is_giris=req.body.is_giris,
		email=req.body.eposta,
	    adres=req.body.adres,
		aciklama=req.body.aciklama;
	
	var is_cikis=req.body.is_cikis;
	
		
	
	
	Kisi.findByIdAndUpdate(req.params.id,{isim:isim,lokasyon:lokasyon,tc:tc,numara:numara,departman:depart,unvan:unv,is_giris:is_giris,email:email,dogum:dogum,adres:adres,aciklama:aciklama,is_cikis:is_cikis},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/personel");
	}
	})
});
app.put("/personel/cikar/:id",middleWare.isLoggedIn,function(req,res){
	Kisi.findByIdAndUpdate(req.params.id,{is_cikis:req.body.is_cikis},function(err,update){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(update);
		res.redirect("/personel");
	}
	})
})


	

	
	








//////////AUTH ROUTES
//show register form
/*app.get("/register",function(req,res){
	res.render("register");
})
//handle sign up logic
app.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			
			return res.render("register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
            
				res.redirect("/personel");
			})
			
		}
	})
});*/
    
	app.get("/",middleWare.isLogged,function(req,res){
	res.render("login");
})
app.post("/",passport.authenticate("local",{
	
	successRedirect:"/personel",
	failureRedirect:"/",
	
	
}),function(req,res){
	
	
});
	



app.get("/logout",middleWare.isLoggedIn,function(req,res){
	req.logout();
	
	res.redirect("/");
	
});//logout yapiliyor ama hala sayfaya erisim var bu yuzden
//ZİMMET MODEL MARKA URUN TURU KISIMLARI




app.get("/model",middleWare.isLoggedIn,function(req,res){
	var urun,marka;
	Urunturu.find({},function(err,allUrun){
		if(err){
			console.log(err);
		}
		else{
			urun=allUrun;
		}
	});
	Marka.find({},function(err,allMarka){
		if(err){
			console.log(err);
		}
		else{
			marka=allMarka;
		}
	});
	Model.find({},function(err,allModel){
		if(err){
			console.log(err);
		}
		else{
			res.render("model",{model:allModel,marka:marka,urunturu:urun});
		}
		
	});
	
	
});

app.post("/model",middleWare.isLoggedIn,function(req,res){
	var isim=req.body.isim,
		urunturu=req.body.urunturu,
		marka=req.body.marka,
		aciklama=req.body.aciklama;
	Model.create({isim:isim,aciklama:aciklama,urun_turu:urunturu,marka:marka},function(err,newModel){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/model");
			console.log(newModel);
			
		}
	});
		

});
//update model
app.put("/model/:id",middleWare.isLoggedIn,function(req,res){
	Model.findByIdAndUpdate(req.params.id,{isim:req.body.isim,aciklama:req.body.aciklama,urun_turu:req.body.urunturu,marka:req.body.marka},function(err,updated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/model");
			console.log(updated);
		
			
		}
	});
});
app.delete("/model/:id",middleWare.isLoggedIn,function(req,res){
	Model.findByIdAndRemove(req.params.id,function(err,deleted){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/model");
			console.log("done!!!!!");
		}
	});
});
app.get("/urunturu",middleWare.isLoggedIn,function(req,res){
	Urunturu.find({},function(err,urunturleri){
		if(err){
			console.log(err);
		}
		else{
			res.render("urunturu",{urunturu:urunturleri});
		}
	});
});
app.post("/urunturu",middleWare.isLoggedIn,function(req,res){
	Urunturu.create({isim:req.body.isim},function(err,newUrunturu){
		if(err){
			console.log(err);
		}
		else{
			console.log(newUrunturu);
			res.redirect("/urunturu");
		}
	});
});
app.put("/urunturu/:id",middleWare.isLoggedIn,function(req,res){
	Urunturu.findByIdAndUpdate(req.params.id,{isim:req.body.isim},function(err,updated){
		if(err){
			console.log(err);
		}
		else{
			console.log(updated);
			res.redirect("/urunturu");
		}
	});
	
});
app.delete("/urunturu/:id",middleWare.isLoggedIn,function(req,res){
	Urunturu.findByIdAndRemove(req.params.id,function(err,deleted){
		if(err){
			console.log(err);
		}
		else{
			console.log("done!!!!!!");
			res.redirect("/urunturu");
		}
	});
});

//marka
app.get("/marka",middleWare.isLoggedIn, function(req, res){
    Marka.find({},function(err,Allmarka){
        if(err){
            console.log(err);
        }
        else{
            res.render("marka",{marka:Allmarka});
        }
    });
});

app.post("/marka",middleWare.isLoggedIn, function(req, res){
    var isim = req.body.isim;

    Marka.create({isim:isim},function(err,marka){
        if(err){
            console.log(err);
        }
        else {
            console.log(marka);
            res.redirect("/marka");
        }
    });
});

app.put("/marka/:id",middleWare.isLoggedIn, function(req, res){
    Marka.findByIdAndUpdate(req.params.id, {isim:req.body.isim}, function(err, updatedMarka){
        if(err) {
            console.log(err);
        }
        else {
            console.log(updatedMarka);
            res.redirect("/marka");
        }
    });
});

app.delete("/marka/:id",middleWare.isLoggedIn, function(req, res){
    Marka.findByIdAndRemove(req.params.id, function(err, deletedMarka){
        if(err) {
            res.redirect("/marka");
        }
        else {
            res.redirect("/marka");
        }
    });
});
//zimmetttttt
//personeelll
app.get("/personel/:id/yeniZimmet",middleWare.isLoggedIn, function(req, res){

   
    var kisi;
	var model;
	Kisi.count({_id: req.params.id}, function (err, count){
		
    if(count>0){
		Kisi.findById(req.params.id).populate("zimmet").exec(function(err,kisi){
	     
        if(err){
			
            console.log(err);

        }else{
           Model.find({},function(err,model){
		if(err){
			console.log(err);
		}
		else{
			
			
			res.render('yeniZimmet',{personel:kisi,model:model});
		}
	})
        }
    }
	)
       
    }
		else{
			
		
		
			Departman.findById(req.params.id).populate("zimmet").exec(function(err,dep){
	
        if(err){
            console.log(err);

        }else{
           Model.find({},function(err,model){
		if(err){
			console.log(err);
		}
		else{
			
			res.render('yeniZimmet',{personel:dep,model:model});
		}
	})
        }
    })
	
		}
			
		
}); 
   

    

   
    
            
        
    });


app.post("/personel/:id/yeniZimmet",middleWare.isLoggedIn, function(req, res){
	
	
    
    var adet = req.body.adet,
     serino = req.body.serino,
     zim_bas = req.body.zim_bas,
     zim_bit = req.body.zim_bit,
     aciklama = req.body.aciklama;
	
Kisi.count({_id: req.params.id}, function (err, count){ 
    if(count>0){
		
		Kisi.findById(req.params.id,function(err,found){
		if(err){
			console.log(err);
		}
		else{
			
			
			Zimmet.create({adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,status:true,modelid:req.body.model},function(err,urun){
        if(err){
            console.log(err);
        }
        else{
			
		
			found.zimmet.push(urun);
			found.save();
		 console.log(urun);
	      res.redirect("back");
         
			
			
        }
    });
			
			
		}
	})
		
    }
	else{
		Departman.findById(req.params.id,function(err,dep){
		if(err){
			console.log(err);
		}
		else{
	Zimmet.create({status:true,adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,modelid:req.body.model},function(err,urun){
        if(err){
            console.log(err);
        }
        else{
			
           
			dep.zimmet.push(urun);
			dep.save();
			 console.log(urun);
	      res.redirect("back");
			
        }
    });
			
			
		}
	})
	}
}); 

});

//zimmet dokum sayfası
app.get("/zimmet",middleWare.isLoggedIn,function(req,res){

	var dep,kisi;
	Kisi.find().populate("zimmet").exec(function(err,allKisi){
		if(err){
			console.log(err);
		}
		else{
			Departman.find().populate("zimmet").exec(function(err,alldep){
		if(err){
			console.log(err);
		}
		else{
			
			Model.find({},function(err,Modeller){
				if(err){
					console.log(err);
				}
				else{
					res.render("zimmet",{personel:allKisi,model:Modeller,departman:alldep});
				}
			})
		
			
		}
	})
			
			
		
			
		}
	})
	
	
})





//zimmet detay sayfası

/*app.get("/personel/:id/zimmet",function(req,res){
	Kisi.count({_id: req.params.id}, function (err, count){ 
    if(count>0){
		Kisi.findById(req.params.id).populate("zimmet").exec(function(err,found){
		if(err){
			console.log(err);
		}else{
			Model.find({},function(err,modeller){
				
				res.render("zimmetdetay",{personel:found,model:modeller});
			})
		}
		
	})
		
		
	}
	else{
		Departman.findById(req.params.id).populate("zimmet").exec(function(err,found){
		if(err){
			console.log(err);
		}else{
			Model.find({},function(err,modeller){
				
				res.render("zimmetdetay",{personel:found,model:modeller});
			})
		}
		
	})
		
		
		
	}
	});
	
	
	
	
});*/
app.put("/personel/:id/pasifZimmet",middleWare.isLoggedIn,function(req,res){
	Zimmet.findByIdAndUpdate(req.params.id,{status:false},function(err,found){
		if(err){
			res.render("errorpage");
		}
		else{
			console.log(found);
			res.redirect('back');
			
		}
	})
})
app.put("/personel/:id/yeniZimmet",middleWare.isLoggedIn,function(req,res){
	
	var adet = req.body.adet,
     serino = req.body.serino,
     zim_bas = req.body.zim_bas,
     zim_bit = req.body.zim_bit,
     aciklama = req.body.aciklama,
	 model=req.body.model;

		
Zimmet.findByIdAndUpdate(req.params.id,{adet:adet,serino:serino,zim_bas:zim_bas,zim_bit:zim_bit,aciklama:aciklama,modelid:model},function(err,found){
		if(err){
			console.log(err);
		}
		else{
			console.log(found);
			res.redirect("back");
		
		   }
	});
		
   
	


});
	
	
	



////////////////////////////////////////////////////////
app.get("*",function(req,res){
	res.render("errorpage");
})

app.listen(3000,function(){
	console.log("The server has started");
});
