const Service = require("../../Service");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
class AuthService extends Service {

    static generateToken = (user) => {
        return jwt.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        }, process.env.SECRET_KEY, { expiresIn: '1800s' });
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

        console.log(res);

        return res;
    }
}

module.exports = AuthService;