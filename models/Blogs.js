const mongoose=require('mongoose');
const blogsschema=new mongoose.Schema({
Content:{

    type:String,
    required:true
}


});
module.exports=mongoose.model('Blogs',blogsschema);