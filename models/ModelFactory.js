const VoiceRecord = require('./voice_model');
const User = require('./user_model');
const Like = require('./like_model');
const Mention = require('./mention_model');
const Conversation = require('./conversation_model');
const Message = require('./message_model');
class ModelFactory {

    static getModel(modelName) {
    
        switch (modelName) {
        case 'voice':
            return VoiceRecord;
        case 'user':
            return User;
        case 'like':
            return Like;
        case 'mention':
            return Mention;
        case 'conversation':
            return Conversation;
        case 'message':
            return Message;
    
        }
    
    }
}

module.exports = ModelFactory;