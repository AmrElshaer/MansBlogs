
const express=require('express');
const Blogs=require('../models/Blogs');
const router=express.Router();
const {body,validationResult}=require('express-validator');
const authentication=require('../common/Authentication');
var validateblog=(params)=> [
    body(params).notEmpty().withMessage('This Field is Required')
    
    ];
router.get('/Create',authentication,(req,res)=>{
    res.render('Blogs/Create',{blog:new Blogs(),errormessage:null});
});
router.post('/Create',validateblog(['Title','Content','universities']),async(req,res)=>{
         var errors=validationResult(req);
         const blog=new Blogs({
            Content:req.body.Content
            ,HashTags:req.body.HashTags,
            Title:req.body.Title,
            Bloger:req.body.Bloger
            
             });
              
            if (errors.isEmpty()) {
               blog.Universities=req.body.universities;
                await blog.save();
                res.redirect('/Blogs');
            } else{
                 res.render('Blogs/Create',{blog:blog,errormessage:errors.array()});
            }
            
           
});
router.get('/:id/Edit',authentication,async(req,res)=>{
    const oldblog=await Blogs.findById(req.params.id);
    res.render('Blogs/Edit',{blog:oldblog,errormessage:null});
});
router.put('/:id',validateblog(['Title','Content','universities']),async(req,res)=>{
    var errors=validationResult(req);
    let blog=await Blogs.findById(req.params.id);
    blog.Title=req.body.Title;
    blog.Universities=req.body.universities;
     blog.Content=req.body.Content;
     if(errors.isEmpty()){
         await   blog.save();
         res.redirect(`/Blogs/${blog.id}`);
     }else{
        res.render('Blogs/Edit',{blog:blog,errormessage:errors.array()});
     }
  
        
    
    
});
router.post('/Create',async(req,res)=>{
     
    try {
            const blog=new Blogs({
            Content:req.body.Content
            ,HashTags:req.body.HashTags,
            Title:req.body.Title,
            Bloger:req.body.Bloger
            
             });
             if(req.body.Universty!=null){
                req.body.Universty.forEach(element => {
                    blog.Universities.push(element);
                });
             }
           
           await blog.save();
           
        } catch (error) {
            
        console.log(error);
        }
  
    res.redirect('/Blogs');
});
router.get('/',async(req,res)=>{
    const blogs=await searchblogs(req,10);
    res.render('Blogs/Index',{blogsdata:blogs});
});
router.get('/GetAllBlogs/:page',async(req,res)=>{
    const blogs=await searchblogs(req,10);
    res.json(blogs);
});
router.get('/:id',async(req,res)=>{
    
    const blog=await Blogs.findById(req.params.id).populate('Bloger');
    res.render('Blogs/Details',{Blog:blog});
});
router.delete('/:id',async(req,res)=>{
    const blog=await Blogs.findById(req.params.id);
    await  blog.remove();
    res.redirect('/Blogs');
});
var searchblogs=async function (req,numberofTake){
    let query=Blogs.find().populate('Bloger');
    let numberofskip=req.params.page!=null?req.params.page:0;
    let universty=req.query.unversity;
    if(universty!='null'&&universty!=null&&universty!='All'){
        query=query.find({ Universities:universty});
    }
    const blogs=await query.sort({ 'CreateAt': 'desc' }).skip(numberofTake*numberofskip).limit(numberofTake).exec();
    return blogs;
}
module.exports=router;