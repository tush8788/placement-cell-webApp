const CompanyDB=require('../models/Company');
const StudentDB=require('../models/student');
const InterviewDB=require('../models/interview');
//company page
module.exports.addCompanyPage=function(req,res){

    return res.render('company',{
        title:"Add Company"
    })
    //return res.redirect('back');
}

//create company
module.exports.createNewCompany=function(req,res){
    // console.log(req.body);
    //check company already exist or not
    CompanyDB.findOne({company_name:req.body.company_name},function(err,company){
        if(err){
            console.log("Error in finding company inside createNewCompany :: ",err);
            return;
        }
        if(company){
            console.log("Company is already exist..");
            return res.redirect('back');
        }

        CompanyDB.create(req.body,function(err,newCompany){
            if(err){
                console.log("Error in creating company :: ",err);
                return;
            }
            // console.log(newCompany);
            return res.redirect('back');
        })
    })
}

//add interview for student page
module.exports.addStudentInterview=function(req,res){
    // console.log(req.params);
    CompanyDB.findById(req.params.id,function(err,Company){
        if(err){
            console.log("Error in finding company inside addStudentInterview :: ",err);
            return;
        }
        //finding all students
        StudentDB.find({},function(err,allStudent){
            if(err){
                console.log("Error in finding company inside addStudentInterview :: ",err);
                return;
            }

            return res.render('addInterview',{
                title:"Add Interview",
                company:Company,
                allStudent:allStudent
            })

        })

    })
}

//assign interview to student
module.exports.assignInterviewToStudent=function(req,res){

    //first finding already interview schedule or not if yes dont sedule interview agin for same company 
    InterviewDB.findOne({student:req.body.student , company:req.body.company_id},function(err,inetrviewList){
        if(err){
            console.log("Error in finding interview in assignInterviewToStudent in interview_controller :: ",err);
            return;
        }
        if(inetrviewList){
            console.log("Interview is already schedule for this comapany this student...");
            return res.redirect("back");
        }
        //if interview font found for this student then sehedule
        InterviewDB.create({
            student:req.body.student,
            company:req.body.company_id,
            interviewStatus:req.body.status
        },function(err,newInterview){
            if(err){
                console.log("Error in finding interview in assignInterviewToStudent in interview_controller :: ",err);
                return;
            }
            // console.log(newInterview);
            return res.redirect('back');
        })

    })
}

//update interview status
module.exports.updateInterviewStatus=function(req,res){
    // console.log(req.params);
    // console.log(req.body);
    InterviewDB.findByIdAndUpdate(req.params.id,
        {interviewStatus:req.body.placement_status},
        function(err,updatedInterview){
            if(err){
                console.log("Error in updating status of interview ..",err);
                return;
            }
            return res.redirect("back");
        })
}

//delete company and related interviews
module.exports.deleteCompany=function(req,res){
    CompanyDB.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log("error in deleteing company ",err)
            return;
        }
        InterviewDB.deleteMany({company:req.params.id},function(err,interview){
            if(err){
                console.log("error in deleteing interview in deleteCompany :: ",err)
                return;
            }
            
            return res.redirect('/');
        })
    })
}