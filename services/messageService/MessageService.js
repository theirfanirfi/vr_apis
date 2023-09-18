const Service = require("../Service");
const Message = require('../../models/message_model');

class MessageService extends Service {
    
    static create = async (message) => {
        return
    }

    static getForUser = async (user) => {
        console.log(user);
        let records = await Like.find({user_id: user.id});
        return records;
    }



static getMessagesByConversationId = async (conversationId, userId) => {
  try {
    const messages = await Message.aggregate([
      {
        $match: { conversation_id: conversationId },
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection is named 'users'
          localField: 'sender',
          foreignField: '_id',
          as: 'senderInfo',
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection is named 'users'
          localField: 'receiver',
          foreignField: '_id',
          as: 'receiverInfo',
        },
      },
      {
        $lookup: {
          from: 'voicerecords', // Assuming your voice records collection is named 'voicerecords'
          localField: 'voice_record',
          foreignField: '_id',
          as: 'voiceRecordInfo',
        },
      },
      {
        $addFields: {
          is_me: {
            $eq: ['$senderInfo._id', mongoose.Types.ObjectId(userId)],
          },
        },
      },
    ]);

    return messages;
  } catch (error) {
    throw new Error(`Error fetching messages: ${error.message}`);
  }
}

}

module.exports = MessageService;