const Service = require("../../Service");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
class AuthService extends Service {

    static generateToken = (user) => {
        console.log(user);
        return jwt.sign({
            id: user._id.toString(),
            name: user.name,
            username: user.username,
            email: user.email,
        }, process.env.SECRET_KEY); 
        
        // { expiresIn: '1800s' });
    }

    static authenticateToken = async (headers) => {
        let token = headers['authorization']
        if(token == undefined) {
            return false;
        }

        let res = false;
        await jwt.verify(token, process.env.SECRET_KEY, (err, response) => {
            if(err) { res = false;}

            res= response;
        });


        return res;
    }

    static generate_opt = () =>{
        let num = (Math.floor(Math.random() * 10000) + 10000)
        return num.toString().substring(1);
    }

    static verify_password = (user_entered_password, db_user_password) => {
        return user_entered_password === db_user_password ? true : false;
    }
}

module.exports = AuthService;