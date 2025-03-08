// JobModel class to represent a job and manage job-related operations

export default class JobModel {
    // Constructor to initialize job properties
    constructor(id, title, description, location, company, salary, postedDate, 
        applicants=[]){ 
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.company = company;
        this.salary = salary;
        this.postedDate = postedDate;
        this.applicants = applicants;
    }
    // Static method to get all jobs
    static getAllJobs(){
        return jobs;
    }
    // Static method to get a job by ID

    static getJobById(id){
        const job = jobs.find(job => job.id == id);

        if(job){
            return job;
        }
        else{
            throw new Error('Job not found');
        }
    }

    // Static method to add a new job
    static addJob(title, description, location, company, salary){
        const id = jobs.length + 1;
        const postedDate = new Date().toISOString().slice(0, 10);
        const job = new JobModel(id, title, description, location, company, salary, postedDate);
        jobs.push(job);
    }

    // Static method to update an existing job
    static updateJob(id, title, description, location, company, salary){
       const index = jobs.findIndex(job => job.id == id);
       const updatedJob = new JobModel(id, title, description, location, company, salary, jobs[index].postedDate);
       jobs[index] = updatedJob;
    }

    // Static method to delete a job by ID
    static deleteJob(id){
        const index = jobs.findIndex(job => job.id == id);
        console.log(index);
        jobs.splice(index, 1);
    }

     // Static method to add an applicant to a job
    static applicants(jobId, name, email, contact, experience, resume){
        const job = jobs.find(job => job.id == jobId);
        const user = {'name' : name, 'email' : email, 'contact' : contact, 'experience' : experience, 'resume' : resume};
        job.applicants.push(user);
    }
    
    // Static method to view applicants for a job
    static viewApplicants(jobId){
        const job = jobs.find(job => job.id == jobId);
        return job.applicants;
    }
    
}

// Array to store job instances

const jobs = [
    {
        id: 1,
        title: 'Software Engineer',
        description: 'Develop software applications',
        location: 'New York',
        company: 'Google',
        salary: '100000',
        postedDate: '2021-09-01',
        applicants: [
            {
                name: 'John',
                email: 'johnDoe@gmail.com',
                contact: '1234567890',
                experience: '2 years',
                resume: 'Resume updated.pdf'
            }
        ]
    },
    {
        id: 2,
        title: 'Data Scientist',
        description: 'Analyze data and provide insights',
        location: 'California',
        company: 'Facebook',
        salary: '120000',
        postedDate: '2021-09-01',
        applicants: []
    },
    {
        id: 3,
        title: 'Product Manager',
        description: 'Manage product development',
        location: 'Texas',
        company: 'Amazon',
        salary: '110000',
        postedDate: '2021-09-01',
        applicants: []
    }
];