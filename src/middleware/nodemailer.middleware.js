import nodemailer from 'nodemailer';

export const sendConfirmationMail = async (req, res, next) =>{
    const {email, name} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: 'adittigarg@gmail.com',
            pass:'jzoe ahkk ftww vmwo'
        }
    });
    
    const mailOptions = {
        from :'adittigarg@gmail.com',
        to: email,
        subject: 'Welcome to Job Portal. Your account has been created successfully',
        text: `Hello ${name},\n\nWelcome to Job Portal. Your account has been created successfully.`
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
        next();
    }
    catch(err){
        console.log(err);
    }

}