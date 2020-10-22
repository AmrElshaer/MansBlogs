const mongoose=require('mongoose');
const university=['Computer Science','Engineer'];
const levels=['First','Second'];
const blogerschema=new mongoose.Schema({
Name:{

    type:String,
    required:true
},
CoverImageName:{
    type:Buffer,
    required:true
},
CoverImageType:{
    type:String,
    required:true
},AboutYou:{
    type:String,
    required:true
    
},
Email:{
    type:String
    ,required:true,
    
}
,Password:{
    type:String,
    required:true
},University:{
    type:String,
    enum:university,
    required:true
},Level:{
  type:String,
  enum:levels,
  required:true
}

});
blogerschema.virtual('ImagePath').get(function(){
    if (this.CoverImageName!=null) {
        /* path.join('/',coverimagePath,this.CoverImageName); */
  
        return `data:${this.CoverImageType};charset=utf-8;base64,${this.CoverImageName.toString('base64')}`;
    }
  
  
  });
blogerschema.virtual('Alluniversity').get(()=>{
    return university;
});
blogerschema.virtual('Levels').get(()=>{
    return levels;
});
module.exports=mongoose.model('Bloger',blogerschema);
