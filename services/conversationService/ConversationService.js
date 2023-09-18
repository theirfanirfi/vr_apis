const Service = require("../Service");
const Conversation = require('../../models/conversation_model');
const mongoose = require('mongoose');

class ConversationService extends Service {
    
    static create = async (message) => {
        return
    }



static getConversationsByUserId = async (userId) => {
  try {
    const conversations = await Conversation.aggregate([
      {
        $match: {
          $or: [
            { user_one: new mongoose.Types.ObjectId(userId) },
            { user_two: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection is named 'users'
          localField: 'user_one',
          foreignField: '_id',
          as: 'userOneInfo',
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming your users collection is named 'users'
          localField: 'user_two',
          foreignField: '_id',
          as: 'userTwoInfo',
        },
      },
      {
        $addFields: {
          amIuserOne: {
            $eq: ['$userOneInfo._id', new mongoose.Types.ObjectId(userId)],
          },
        },
      },
      {
        $project: {
          userOneInfo: { password: 0 }, // Exclude sensitive fields from user documents
          userTwoInfo: { password: 0 }, // Exclude sensitive fields from user documents
          // You can include other conversation fields as needed
        },
      },
    ]).exec();

    return conversations;
  } catch (error) {
    throw new Error(`Error fetching conversations: ${error.message}`);
  }
}

}

module.exports = ConversationService;