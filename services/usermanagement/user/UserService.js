const Service = require("../../Service");
const User = require('../../../models/user_model');

class UserService extends Service {
    
    static create = async (userObject) => {
        let user= new User(userObject);
        await user.save();
        console.log(user);
    }

    static update = async (userObject) => {
        let user= new User(userObject);
        await user.save();
        console.log(user);
    }
}

module.exports = UserService;