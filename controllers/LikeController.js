const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");
const AuthService = require("../services/usermanagement/account/AuthService");
const VoiceRecordService = require("../services/voicerecords/VoiceRecordService");
const mongoose = require("mongoose");

class LikeController extends Controller {
    static required_params = ['vr_id']
    static valiate_obj_for_required_params = (obj) => {
        // return VoiceRecordController.required_params.every(val => obj[val] != undefined && (obj[val] != "" || obj[val]))
        return true;
    }

    static index = async (req, res) => {
        let records = await VoiceRecordService.getForUser(req.user);
        res.status(200).json({status: true, voice_records: records});
    }

    static create = async (req, res) => {
        let id = req.params.id
        console.log(req.user);
        if(!(id == null || id == undefined || id == "")) {
            let isLiked = await VoiceRecordService.likeVoiceRecord({id: req.user.id}, id);

            if(isLiked){
                res.status(200).json({
                    status: true,
                    message: 'You have liked the voice record',
                })
            }else {
                res.status(404).json({
                    status: false,
                    
                    message: 'Error occurred while liking voice record, please try again',
                })
            }

        }else {
            res.status(404).json({
                status: false,
                message: 'Invalid data',
            })
        }
    }

}

module.exports = LikeController;