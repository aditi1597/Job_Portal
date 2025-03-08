import express from "express";
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import JobController from "./src/controller/job.controller.js";
import UserController from "./src/controller/user.controller.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import {auth} from "./src/middleware/auth.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.js";
import { sendConfirmationMail } from "./src/middleware/nodemailer.middleware.js";
import { lastVisit } from "./src/middleware/lastVisit.middleware.js";

const app = express();

//parse form data
app.use(express.urlencoded({extended: true}));

//use the express-static middleware
app.use(express.static("public"));
app.use(express.static("src/views"));

//use session
app.use(session({
    secret: "SecretKeyForMyApp",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

//use cookie parser
app.use(cookieParser());
app.use(lastVisit);

// Middleware to set locals.userEmail
app.use((req, res, next) => {
    res.locals.userEmail = req.session.userEmail || null;
    res.locals.userRole = req.session.userRole || null;
    next();
});

//use express-ejs-layouts
app.use(ejsLayouts);

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.join(path.resolve(), "src", "views"));

//define the first route
const jobcontroller = new JobController();
const usercontroller = new UserController();

app.get('/', auth, jobcontroller.getAllJobs);
app.get("/new", auth, jobcontroller.getAddJob);
app.get('/updateJob/:id', auth, jobcontroller.getUpdateJobForm);
app.get('/register', usercontroller.getRegistrationForm);
app.get('/login', usercontroller.getLoginForm);
app.get('/logout', usercontroller.getlogout);
app.get('/viewJobDetail/:id', auth, jobcontroller.getJobDetails);
app.get('/applyJob/jobId/:id', jobcontroller.applyJobForm);
app.get('/viewApplicants/:id', auth, jobcontroller.viewJobApplicants);

app.post('/add-job', auth, jobcontroller.addJob);
app.post('/updateJob', auth, jobcontroller.updateJob);
app.post("/deleteJob/:id", auth, jobcontroller.deleteJob);
app.post('/register', usercontroller.registerUser, sendConfirmationMail);
app.post('/login', usercontroller.loginUser);
app.post('/applyJob/jobId/:id',auth, uploadFile, jobcontroller.applyJob);

app.listen(3200, () => {
    console.log(`Server is running on http://localhost:3200`);
});