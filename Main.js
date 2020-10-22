if (process.env.Node_ENV!='production') {
    require('dotenv').config();
}
//Models
const bloger=require('./models/Bloger');
const alluniversty=['Computer Science','Engineer'];
//express
const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
//db
const mongoose=require('mongoose');
//router
const bodyparser=require('body-parser');
const methodoverride=require('method-override');
const homeroute=require('./route/Home');
const blogsroute=require('./route/Blogs');
const accountRoute=require('./route/Account');
const profileRoute=require('./route/Bloger');
//db logic
mongoose.connect(process.env.DatabaseUrl,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',(err)=>console.error(err));
db.once('open',()=>console.log('connect'));
//authentication
const passport=require('passport');
const flash=require('express-flash');
const session=require('express-session');
const initializePassport=require('./passport-config');
initializePassport(passport,async (email)=>{
return await bloger.findOne({Email:email});
},async(id)=>{return await bloger.findById(id);});
// midlware 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(methodoverride('_method'));
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}) );
app.use(flash());
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    app.locals.Universities=alluniversty;
    app.locals.User=req.user;
    next();
});
//router midleware
app.use('/',homeroute);
app.use('/Blogs',blogsroute);
app.use('/Account',accountRoute);
app.use('/Profile',profileRoute);
app.listen(process.env.PORT||3000);