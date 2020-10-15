const express=require('express');
const Blogs=require('../models/Blogs');
const router=express.Router();

router.get('/Create',(req,res)=>{
    res.render('Blogs/Create');
});
router.post('/Create',async(req,res)=>{
    try {
            const blog=new Blogs({
            Content:req.body.Content
            
        });
        await blog.save();
    } catch (error) {
        console.log(error);
    }
  
    res.redirect('/Blogs');
});
router.get('/',async(req,res)=>{
    const blogs=await Blogs.find({});
    res.render('Blogs/Index',{blogsdata:blogs});
});
router.get('/:id',async(req,res)=>{
    const blog=await Blogs.findById(req.params.id);
    res.render('Blogs/Details',{Blog:blog});
});
module.exports=router;