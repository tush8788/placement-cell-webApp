const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const UserDB=require('../models/user');

passport.use(new LocalStrategy({usernameField:'email'},function(email,password,done){

        //finding user
        UserDB.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user inside passport :: ",err);
                return done(err);
            }
            if(!user || user.password != password)
            {
                console.log("Invild Email or Password ");
                return done(null,false);
            }
            return done(null,user);
        })
}));

//serializeUser
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserializeUser
passport.deserializeUser(function(id,done){
    UserDB.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user inside deserializeUser passport :: ",err);
            return done(err);
        }

        return done(null,user);

    })
})

//check user login or not
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/");
}

//set sign in user in locals
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}