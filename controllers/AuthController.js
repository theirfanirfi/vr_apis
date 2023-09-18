const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");
const AuthService = require("../services/usermanagement/account/AuthService");

class AuthController extends Controller {
    static required_params = ['password', 'username']
    static valiate_user_obj_for_required_params = (user) => {
        return AuthController.required_params.every(val => user[val] != undefined && user[val] != "")
    }

    static index = async (req, res) => {
        console.log(req.path);
        res.status(200).json({status: true});
    }

    static signin = async (req, res) => {

        let user = req.body;
        if(AuthController.valiate_user_obj_for_required_params(user)){

             let userFetched = await UserService.getUser(user.username);
            if(userFetched){
                if(AuthService.verify_password(user.password, userFetched.password)){
                    userFetched['token'] = AuthService.generateToken(userFetched);
                    userFetched = UserService.removeCriticalProperties(userFetched);
                    res.status(200).json(
                        {
                            user: userFetched, 
                            status: true,
                            message: "login Successful"
                        }
                        
                        );
                 }else {
                res.status(404).json({user: {}, status: false,
                    message: "Invalid credentials"});

                 }

            }else {
                res.status(404).json({user: {}, status: false,
                    message: "Invalid credentials"});
            }
        }else {
            res.status(404).json({user: [], status: false, message:"Request data not provided."})
        }
    }


 





}

module.exports = AuthController;