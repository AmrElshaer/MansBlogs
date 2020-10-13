if (process.env.Node_ENV!='production') {
    require('dotenv').config();
}
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

//authentication
const passport=require('passport');
const flash=require('express-flash');
const session=require('express-session');

//db logic
mongoose.connect(process.env.DatabaseUrl,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',(err)=>console.error(err));
db.once('open',()=>console.log('connect'));
// midlware 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(methodoverride('_method'));
app.use(bodyparser.urlencoded({limit:'10mb',extended:false}) );
//router midleware
app.use('/',homeroute);
app.listen(process.env.PORT||3000);