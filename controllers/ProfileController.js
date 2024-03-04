const Controller = require("./controller");
const ProfileService = require("../services/profileService/ProfileService");

class ProfileController extends Controller {

    static index = async (req, res) => {
        // let user_id = req.user.id
        // let conversations = await ConversationService.getConversationsByUserId(user_id);
        // console.log('conversations', conversations);
        // res.status(200).json({status: true, conversations: conversations});
    }

    static get = async (req, res) => {
        let username = req.params.username;
        console.log('user', req.user);
        let profile = await ProfileService.getUserProfile(username, req.user);
        console.log('profile', profile);
        res.status(200).json({status: true, profile: profile});
    }

    // static create = async (req, res) => {
    //     let record = req.body;
    //     console.log(req.user);
    //     if(VoiceRecordController.valiate_obj_for_required_params(record)){
    //         record['user'] = new mongoose.Types.ObjectId(req.user.id);
    //         let isVoiceRecord = await VoiceRecordService.create(record);

    //         if(isVoiceRecord){
    //             res.status(200).json({
    //                 status: true,
    //                 voice_record: isVoiceRecord,
    //                 message: 'Voice record Posted successfully',
    //             })
    //         }else {
    //             res.status(404).json({
    //                 status: false,
    //                 voice_record: {},
    //                 message: 'Error occurred while creating voice record, please try again',
    //             })
    //         }

    //     }else {
    //         res.status(404).json({
    //             status: false,
    //             voice_record: {},
    //             message: 'Required fileds must be provided.',
    //         })
    //     }
    // }

}

module.exports = ProfileController;