const Service = require("../Service");
const LikeModel = require('../../models/like_model');

class LikeService extends Service {
    
    static create = async (like) => {
        let like= new Like(like);
        like = await like.save();
        return like ? like : false;
    }

    static getForUser = async (user) => {
        console.log(user);
        let records = await Like.find({user_id: user.id});
        return records;
    }
}

module.exports = LikeService;