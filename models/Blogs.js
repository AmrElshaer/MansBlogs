const mongoose=require('mongoose');
const university=['Computer Science','Engineer','All'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const blogsschema=new mongoose.Schema({
Content:{

    type:String,
    required:true
}
,Title:{
    type:String
}
,Bloger:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Bloger'
},
CreateAt:{
    type:Date,
    required:true,
    default:Date.now
},
Universities:{
 type:[String],
 required:true
}
});
blogsschema.virtual('PublishDate').get(function(){
   
    return `${months[this.CreateAt.getMonth()]}  ${this.CreateAt.getDate()},${this.CreateAt.getFullYear()}`;
  
});
blogsschema.virtual('Alluniversity').get(()=>{
    return university;
});
module.exports=mongoose.model('Blogs',blogsschema);