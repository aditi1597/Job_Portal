export default class UserModel {
    // Constructor to initialize user properties
    constructor(
        name, 
        email, 
        contact,
        password, 
        role = "user"
    ){
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.password = password;
        this.role = role;
        // this.appliedJobs = appliedJobs;
    }

    // Static method to get all users
    static getUsers(){
        return users;
    }

    // Static method to get a user by email
    static getuserbyEmail(email){
        return users.find(user => user.email == email.toLowerCase());
    }

    // Static method to add a new user
    static async addUser(name, email, contact, password){
        let newUser = new UserModel(name, email, contact, password);
        users.push(newUser);
    }

    // Static method to login a user
    static login(email, password){
        let user = UserModel.getuserbyEmail(email);
        let error;
        if(user && user.password == password){
            return user;
        }
        else if(!user){
            error = "Invalid email";
        }
        else{
            error = "Invalid email or password";
        }
        return error;
    }
}

// Array to store user instances
const users = [
    new UserModel('John Doe', 'john@example.com', '1234567890', 'password123', 'user'),
    new UserModel('Jane Smith', 'jane@example.com', '0987654321', 'password456', 'user'),
    new UserModel('Test User', 'test@gmail.com', '0987654321', 'test123', 'user'),
    new UserModel('Admin User', 'admin@example.com', '1122334455', 'adminpassword', 'admin')
]