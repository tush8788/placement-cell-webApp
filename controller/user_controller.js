const UserDB=require('../models/user');
const StudentDB=require('../models/student');
const CompanyDB=require('../models/Company');

//create new user
module.exports.createUser=function(req,res){
    // console.log(req.body);
    if(req.body.password != req.body.ConformPassword){
        return res.redirect('back');
    }

    UserDB.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user inside createUser :: ",err);
            return;
        }
        if(user){
            console.log("Email is already exist ..!");
            return res.redirect('/');
        }
        UserDB.create(req.body,function(err,newUser){
            if(err){
                console.log("error in creating user inside createUser :: ",err);
                return;
            }
            // console.log(newUser);
            return res.redirect('/');
        })
    })
}

//create session means sign in user
module.exports.createSession=function(req,res){
    return res.redirect('/user/dashboard');
}

//Dashboard
module.exports.dashboard=function(req,res){
    //finding all students
    StudentDB.find({},function(err,allStudent){
        if(err){
            console.log("error in finding Student inside Dashboard :: ",err);
            return;
        }
        //finding company
        CompanyDB.find({},function(err,allCompany){
            if(err){
                console.log("error in finding Company inside Dashboard :: ",err);
                return;
            }
            return res.render('Dashboard',{
                title:"Dashboard",
                allStudent:allStudent,
                allCompany:allCompany
            });
        })       
    })
   
}
//signout
module.exports.signOut=function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('/');
    })    
}