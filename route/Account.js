const express = require('express');
const Bloger=require('../models/Bloger');
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const passport=require('passport');
const router = express.Router();
var RegisterValidation=(params)=> [
    body(params).notEmpty().withMessage('This Field is Required'),
    body('Password').isLength({ min: 5 }),
    body('Email').isEmail().withMessage('You Must Enter Valid Email'),
    
    body('Email').custom(value=>{
        const user=Bloger.find({'Email':value})
        if(user.length>0){
          return false;
        }
        return true;
    }).withMessage("This Email is Exit")

 
    
    ];
var updateprofileValidation=(params)=> [
  body(params).notEmpty().withMessage('This Field is Required')
 ];
var LoginValidation=(params)=>[
  body(params).notEmpty().withMessage('This Field is Required'),
  body('Password').isLength({ min: 5 }),
  body('Email').isEmail().withMessage('You Must Enter Valid Email')
];
router.get('/Register',(req,res)=>{res.render("./Account/Register",{user:new Bloger(),errormessage:null})});
router.post('/Register',RegisterValidation(['Name','AboutYou','CoverImageName','Password','Email']),async(req,res)=>{
var errors=validationResult(req);
const bloger=new Bloger({
  Name: req.body.Name,
  AboutYou:req.body.AboutYou,
  Email:req.body.Email,
  Password:req.body.Password,
  University:req.body.University,
  Level:req.body.Level,
})
if(errors.isEmpty()){
    SaveImageCover(bloger,req.body.CoverImageName);
    bloger.Password= await bcrypt.hashSync(bloger.Password,10);
    await bloger.save();
    res.redirect('/Account/Login');
}
else{
  res.render('./Account/Register',{user:bloger,errormessage:errors.array()});
}

});
router.get('/Login',(req,res)=>{res.render("./Account/Login",{user:new Bloger(),errormessage:null})});
function  SaveImageCover(user,encodeCover){
    
    if (encodeCover==null)return;
    const cover=JSON.parse(encodeCover);
    if (cover!=null) {
       
        user.CoverImageName=new Buffer.from(cover.data,'base64');
        user.CoverImageType=cover.type;
    }

}
router.delete('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/Account/Login');
});
router.post('/Login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/Account/Login'
  ,failureFlash:true

}),async(req,res)=>{
  var errors=validationResult(req);
  const user=new User({
    Email:req.body.Email,
    Password:req.body.Password
  
  })
  if(errors.isEmpty()){
    
       
      const userlogin= await Bloger.find({'Email':user.Email,'Password':user.Password});
      if(userlogin!=null){
           res.redirect('/');
      }
      else{
        res.redirect('/Account/Login');
      }
      
  }
  else{
    res.render('./Account/Login',{user:user,errormessage:errors.array()});
  }
  
  });
router.put('/:id',updateprofileValidation(['Name','AboutYou','Level','University']),async(req,res)=>{
  let errors=validationResult(req); 
let profile=await Bloger.findById(req.params.id);

  profile.Name=req.body.Name;
  profile.University=req.body.University;
  profile.Level=req.body.Level;
  profile.AboutYou=req.body.AboutYou;
  if(req.body.CoverImageName!=null&&req.body.CoverImageName!=''){
    SaveImageCover(profile,req.body.CoverImageName);
   }
   if(errors.isEmpty()){
     await profile.save();
     res.redirect(`/Profile/${profile.id}`);
   }else{
    res.render('Blogers/Detials',{Profile:profile,errormessage:errors.array()});
   }

});
function  SaveImageCover(bloger,encodeCover){
    
  if (encodeCover==null)return;
  const cover=JSON.parse(encodeCover);
  if (cover!=null) {
     
    bloger.CoverImageName=new Buffer.from(cover.data,'base64');
    bloger.CoverImageType=cover.type;
  }

}
module.exports = router;