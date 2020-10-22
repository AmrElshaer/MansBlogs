
const CheckAuthenticated=function(req,res,next){
    if (req.user!=null) {
        return next();
    }
    res.redirect('/Account/Login');
    }
module.exports=CheckAuthenticated;