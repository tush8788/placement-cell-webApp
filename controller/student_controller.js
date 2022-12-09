const StduentDB=require('../models/student');
const InterviewDB=require('../models/interview');

//add student page
module.exports.addStudentPage=function(req,res){
    return res.render('StudentForm',{
        title:"Add Student"
    })
}

//create student
module.exports.createStduent=function(req,res){
    // console.log(req.body);
    //first check student already present in db or not 
    StduentDB.findOne({email:req.body.email},function(err,student){
        if(err){
            console.log("Error in finding student in side createStudent ",err);
            return;
        }
        if(student){
            console.log("Student is Allready Exists..");
            return res.redirect('back');
        }
        //if student  is not found then create newStudent
        StduentDB.create(req.body,function(err,newStudent){
            if(err){
                console.log("Error in creating student in side createStudent ",err);
                return;
            }
            // console.log(newStudent);
            return res.redirect('back');
        })

    })    
}

//delete student 
module.exports.deleteStduent=function(req,res){
    // console.log(req.params);
    StduentDB.findById(req.params.id,function(err,student){
        if(err){
            console.log("Error in finding student in side createStudent ",err);
            return;
        }
        if(!student){
            return res.redirect("back");
        }

        let studentId=student.id;

        student.remove();

        InterviewDB.deleteMany({student:studentId},function(err,interview){
            if(err){
                console.log("error in deleteing interview in deleteCompany :: ",err)
                return;
            }
            
            return res.redirect('/');
        })
        //delete interviews also
        // return res.redirect('back');

    })
}

//view student page  and show schedule interview 
module.exports.viewStudent=function(req,res){
    StduentDB.findById(req.params.id,function(err,student){
        if(err){
            console.log("Error in finding student in side viewStudent ",err);
            return;
        }

       
        // finding sedule interview
        InterviewDB.find({student:student.id}).populate('company').exec(function(err,interviewList){
            if(err){
                console.log("Error in finding interview in CompanyDB in side viewStudent ",err);
                return;
            }
            // console.log(interviewList);
            return res.render('studentView',{
                title:"Student View",
                student:student,
                interviewList:interviewList
            })
            
        })
    })
}

//update student
module.exports.updateStudent=function(req,res){
    // console.log("params ",req.params);
    // console.log(req.body);
    // return res.redirect("back");

    StduentDB.findByIdAndUpdate(req.params.id,req.body,function(err,updatedStudent){
        if(err){
            console.log("Error in updating  student in side updateStudent :: ",err);
            return;
        }
        // console.log(updatedStudent);
        return res.redirect("back");
    })

}