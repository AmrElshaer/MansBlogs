const bloger=require('../models/Bloger');
const blogs=require('../models/Blogs');
const express=require('express');
const router=express.Router();
const authentication=require('../common/Authentication');
router.get('/:id',authentication,async(req,res)=>{
const profile=await bloger.findById(req.params.id);
res.render('Blogers/Detials',{Profile:profile,errormessage:null});
});
router.get('/:id/MyBlogs',async(req,res)=>{
    const profile=await bloger.findById(req.params.id);
    const allBlogs=await blogs.find({'Bloger':profile.id}).sort({'CreateAt':'desc'}).populate('Bloger').exec();
    res.render('Blogers/Index',{blogsdata:allBlogs});

});
module.exports=router;
