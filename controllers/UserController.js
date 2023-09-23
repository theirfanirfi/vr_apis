const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");
const AuthService = require("../services/usermanagement/account/AuthService");

class UserController extends Controller {
    static required_params = ['name', 'password', 'username', 'phone', 'country_code']
    static valiate_user_obj_for_required_params = (user) => {
        return UserController.required_params.every(val => user[val] != undefined && user[val] != "")
    }

    static index = async (req, res) => {
        res.status(200).json({status: true});
    }

    static get_user = async (req, res) => {
        let {username} = req.params;
        let user = await UserService.getUser(username);
        res.status(200).json({status: user});
    }

    static create = async (req, res) => {
        let user = req.body;
        if(UserController.valiate_user_obj_for_required_params(user)){
            user['is_otp_generated'] = true;
            user['otp_code'] = AuthService.generate_opt();

             user = await UserService.create(user);
            user['token'] = AuthService.generateToken(user);
             console.log(user.otp_code);
            if(user){
                console.log(user);
                res.status(200).json(
                    {
                        user: user, 
                        status: true,
                    }
                    
                    );
            }else {
                res.status(404).json({user: {}, status: false});
            }
        }else {
            res.status(404).json({user: [], status: false, message:"Request data not provided."})
        }
    }


    static verify_otp = async (req, res, next) => {
        let body = req.body
        console.log('body ');
        console.log('body ', body);
        // let headers = {
        //     "authorization": body.token,
        // }
        // res.status(400).json({user: {userDecoded}, status: false, message: "Invalid OPT Codee"});

        if(body['otp_code'] == "" || body['otp_code'] == undefined){
            res.status(404).json({user: {}, status: false, message: "Invalid OPT Code"});
        }else {
            let userDecoded = await AuthService.authenticateToken(req.headers);
            if(userDecoded && userDecoded != undefined) {
            

        let user = await UserService.verifyToken(userDecoded, body.otp_code);
        console.log(user);
        if(user[0]){
            user[1]['token'] = req.headers['authorization'];
            res.status(200).json({user: user[1], status: true, message: "Verified"});
        }else {
            res.status(404).json({user: {}, status: false, message: "Invalid OPT Code"});
        }
    }else {
        res.status(404).json({user: {}, status: false, message: "Invalid OPT Code"});
    }
    }
}





}

module.exports = UserController;