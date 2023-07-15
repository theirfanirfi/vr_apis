const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");
const AuthService = require("../services/usermanagement/account/AuthService");

class UserController extends Controller {
    static required_params = ['name', 'password', 'email', 'username', 'phone']
    static valiate_user_obj_for_required_params = (user) => {
        return UserController.required_params.every(val => user[val] != undefined && user[val] != "")
    }

    static index = async (req, res) => {
        res.status(200).json({status: true});
    }

    static create = async (req, res) => {
        let user = req.body;
        
        if(UserController.valiate_user_obj_for_required_params(user)){
             user = await UserService.create(user);
            if(user){

                let token = AuthService.generateToken(user);

                res.status(200).json(
                    {
                        user: user, 
                        status: true,
                        token: token
                    }
                    
                    );
            }else {
                res.status(404).json({user: {}, status: false});
            }
        }else {
            res.status(404).json({user: [], status: false, message:"Request data not provided."})
        }
    }



}

module.exports = UserController;