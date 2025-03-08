import UserModel from '../model/user.model.js';
/**
 * UserController handles user-related operations such as registration, login, and logout.
 */
export default class UserController{

    getRegistrationForm(req, res){
        res.render('register', {success: false});
    }   

    getLoginForm(req, res){
        res.render('login', {errorMessage: null});
    }

    async registerUser(req, res, next){
        const {name, email, contact, password} = req.body;
        await UserModel.addUser(name, email, contact, password);

        res.render('register', {success: true});
        next();
    }

    loginUser(req, res){
        const { email, password } = req.body;
        let user = UserModel.login(email, password);

        if(user instanceof UserModel){
            req.session.userEmail = user.email;
            req.session.userName = user.name;
            req.session.userRole = user.role;
            res.redirect('/');
        }
        else{
            res.render('login', {errorMessage: user});
        }
    }

    logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                return console.log(err);
            }
            res.redirect('/');
        });
    }

}
