const Controller = require("./controller");
const FollowService = require("../services/followService/FollowService");

class FollowController extends Controller {

    static index = async (req, res) => {
    }

    static get = async (req, res) => {

    }

    static followUnFollow = async (req, res) => {
        let username = req.params.username;
        let followResponse = await FollowService.followUnFollowUser(req.user.id, username);
        console.log(followResponse);
        res.json(followResponse);
    }


}

module.exports = FollowController;