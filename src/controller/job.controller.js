import JobModel from "../model/job.model.js";

export default class JobController {
  
    getAllJobs(req, res){
        let jobs =  JobModel.getAllJobs();
        let username = req.session.userName;
        let role = req.session.userRole;

        res.render('jobs', {jobs: jobs, user: username, role: role});
    }

    getJobDetails(req, res){
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        res.render('jobView', {job: job});
    }

    getAddJob(req, res){
        res.render('addJob');
    }
    
    applyJobForm(req, res){
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        res.render('applyJob', {job: job});
    }

    addJob(req, res, next){
        console.log(req.body);
        const{title, description, location, company, salary} = req.body;
        JobModel.addJob(title, description, location, company, salary);

        res.redirect('/');
    }

    getUpdateJobForm(req, res){
        const id = req.params.id;
        const job = JobModel.getJobById(id);
        res.render('updateJob', {job: job});
    }

    updateJob(req, res, next){
        const id= req.body.id;
        const {title, description, location, company, salary} = req.body;
        JobModel.updateJob(id, title, description, location, company, salary);
        res.redirect('/');
    }

    deleteJob(req, res){
        const id = req.params.id;
        JobModel.deleteJob(id);
        res.redirect('/');
    }

    applyJob(req, res){
        const jobId = req.params.id;
        const {name, email, contact, experience, resume} = req.body;
        JobModel.applicants(jobId, name, email, contact, experience, resume);
        res.redirect('/');
    }

    viewJobApplicants(req, res){
        const id= req.params.id;
        const job = JobModel.getJobById(id);

        if (!job) {
            return res.render('viewApplicants', {job: null, applicants: null, error: "Job not found"});
        }
        const applicants = JobModel.viewApplicants(id);
        if(applicants){
            res.render('viewApplicants', {job: job, applicants: applicants, error: null});
        }
        else{
            res.render('viewApplicants', {job: job, applicants: applicants, error: "No applicants found"});
        }
    }
}