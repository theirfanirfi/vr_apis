const Controller = require("./controller");
const ConversationService = require("../services/conversationService/ConversationService");

class ConversationController extends Controller {

    static index = async (req, res) => {
        let user_id = req.user.id
        let conversations = await ConversationService.getConversationsByUserId(user_id);
        console.log('conversations', conversations);
        res.status(200).json({status: true, conversations: conversations});
    }

    static get = async (req, res) => {
        let user_id = req.user.id
        let conversations = await ConversationService.getConversationsByUserId(user_id);
        console.log('conversations', conversations);
        res.status(200).json({status: true, conversations: conversations});
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

module.exports = ConversationController;