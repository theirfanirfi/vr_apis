const UserService = require("../services/usermanagement/user/UserService");
const Controller = require("./controller");
const AuthService = require("../services/usermanagement/account/AuthService");
const VoiceRecordService = require("../services/voicerecords/VoiceRecordService");
const mongoose = require("mongoose");

class VoiceRecordController extends Controller {
    static required_params = ['voice_record', 'is_long', 'is_short', 'hash_tags', 'is_mention']
    static valiate_obj_for_required_params = (obj) => {
        // return VoiceRecordController.required_params.every(val => obj[val] != undefined && (obj[val] != "" || obj[val]))
        return true;
    }

    static index = async (req, res) => {
        let records = await VoiceRecordService.getForUser(req.user);
        res.status(200).json({status: true, voice_records: records});
    }

    static create = async (req, res) => {
        let record = req.body;
        console.log(req.user);
        if(VoiceRecordController.valiate_obj_for_required_params(record)){
            record['user'] = new mongoose.Types.ObjectId(req.user.id);
            let isVoiceRecord = await VoiceRecordService.create(record);

            if(isVoiceRecord){
                res.status(200).json({
                    status: true,
                    voice_record: isVoiceRecord,
                    message: 'Voice record Posted successfully',
                })
            }else {
                res.status(404).json({
                    status: false,
                    voice_record: {},
                    message: 'Error occurred while creating voice record, please try again',
                })
            }

        }else {
            res.status(404).json({
                status: false,
                voice_record: {},
                message: 'Required fileds must be provided.',
            })
        }
    }

}

module.exports = VoiceRecordController;