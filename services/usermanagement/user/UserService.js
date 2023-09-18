const Service = require("../../Service");
const User = require('../../../models/user_model');

class UserService extends Service {
    
    static create = async (userObject) => {
        let user= new User(userObject);
        user = await user.save();
        console.log('opt code ',user.otp_code)
        user = this.removeCriticalProperties(user);
        return user ? user : false;
    }

    static getUser = async (emailOrUsername) => {
        let user = await User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]})
        return user == null ? false : user;
    }

    static update = async (userObject) => {
        let user= new User(userObject);
        user = await user.save();
        console.log(user);
    }

    static getUserProfile = async (userObject) => {

        let user = await User.aggregate([
            {"$match": {"_id": userObject.id}},
            {
                $lookup: {
                    from: 'voicerecords',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'voicerecords',
                }
            },

            {
                $lookup: {
                    from: 'voicerecords',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'voicerecords',
                }
            }
        ])
    }

    static removeCriticalProperties =  (user) => {
        user = user.toObject();
        delete user['password'];
        delete user['is_verified'];
        delete user['is_password_reset_request'];
        delete user['is_otp_generated'];
        delete user['is_active'];
        delete user['is_deleted'];
        delete user['otp_code'];
        return user;
    }

    static verifyToken = async (decodedUser, otp_code) => {
        console.log('verifying token', )
        console.log(decodedUser)
        let user = await User.findOne({_id: decodedUser.id, is_otp_generated: true, otp_code: otp_code.toString()});
        console.log('findone ',user);
        if(user){
            user.is_verified = true;
            user.is_otp_generated = false;
            user.otp_code = -1;
            if(user.save()){
                return [true, user, "User verified"];
            }else {
                return [false, false, "Could not verify the user, re-generate the OTP code and try again."]
            }
        }else {
            return [false, false, "invalid otp code."]
        }
    }
}

module.exports = UserService;