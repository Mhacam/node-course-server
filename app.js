const express =require("express");
const hbs=require("hbs");
const fs=require("fs");
var app=express();
const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper("getCurrentYear",()=>{
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text)=>{
	return text.toUpperCase();
})

app.set("view engine","hbs");
app.use(express.static(__dirname+"/public"));

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`

	console.log(log);
	fs.appendFile('server.log',log+"\n",(err)=>{
		if (err){
			console.log("Unable to append")
		}
	})
	next();

});

app.get("/",(req,res)=>{

	res.render("home.hbs",{
		welcome:"Welcome!",
		pageTitle:"Home page",
	});

});
app.get("/about",(req,res)=>{
	res.render("about.hbs",{
		pageTitle:"About page",
		currentYear:new Date().getFullYear()
	});
});

app.get("/bad",(req,res)=>{
	res.send({
		errorMessage:"Unable to connect!"
	}
)});
app.listen(port,()=>{

	console.log(`Server Up on ${port}`);
});