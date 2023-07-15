const AuthService = require("../services/usermanagement/account/AuthService");


class AuthWare {

     static async verify_token(req, res, next) {
        let user = await AuthService.authenticateToken(req.headers);
        if(user == false || user == undefined) {
            res.status(401).json({
                status: false,
                message: "Invalid Authorization",
            })
        }else {
            req.user = user;
        next();
        }
    }

}

module.exports = AuthWare;