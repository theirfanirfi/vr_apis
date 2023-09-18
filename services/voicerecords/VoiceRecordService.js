const Service = require("../Service");
const VoiceRecord = require('../../models/voice_model');
const Like = require('../../models/like_model');

const mongoose = require('mongoose');

class VoiceRecordService extends Service {
    
    static create = async (voice_record) => {
        let record= new VoiceRecord(voice_record);
        record = await record.save();
        return record ? record : false;
    }

    static getForUser = async (user) => {
        // console.log(user);
        // let records = await VoiceRecord.find({user: user.id})
        // .populate([{path: 'user'}]);

        // if(records.length > 0) {
        
        //     let likesCount = 
        
        // }

        let records = await this.getForUserTest(user);
        return records;
    }

    static getForUserTest = async (user) => {
        // console.log('user', user);
        let user_id = new mongoose.Types.ObjectId(user.id);
        console.log('user_id', user_id);
        let records =  await VoiceRecord.aggregate([
            { "$match": { "user":  user_id}},
            {
                $lookup: {
                  from: 'users',
                  localField: 'user',
                  foreignField: '_id',
                  as: 'vr_user',
                },
              },
            {
              $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'vr_id',
                as: 'likes',
              },
            },
            
            {
              $lookup: {
                from: 'shares',
                localField: '_id',
                foreignField: 'vr_id',
                as: 'shares',
              },
            },

            {
                $lookup: {
                  from: 'listens',
                  localField: '_id',
                  foreignField: 'vr_id',
                  as: 'listens',
                },
              },
            {
                $project: {
                    "likes": {"$size":"$likes"},
                    "voice_record": "$voice_record",
                    "is_long": "$is_long",
                    "is_short": "$is_short",
                    "is_mention": "$is_mention",
                    "hash_tags": "$hash_tags",
                    "created_at": "$created_at",
                    "updated_at": "$updated_at",
                    "shares": {"$size":"$shares"},
                    "user": {"$arrayElemAt": ["$vr_user", 0]},
                    "listens": {"$size": "$listens"}
                }
            }
          ]);

        //   console.log(records); 
          return records;
    }

    static getVoiceRecordByObjectId = async (objectId) => {
        let record=  await VoiceRecord.findOne({_id: objectId});
        return record ? record : false;

    }

    static checkWhetherAlreadyLiked = async (user, objectId) => {
        let like = await Like.findOne({user: user.id, vr_id: objectId});
        return like? like : false;
    }

    static likeVoiceRecord = async (user, objectId) => {
        let alreadyLiked = await this.checkWhetherAlreadyLiked(user, objectId);
        console.log('alreadyLiked', alreadyLiked);

        if(this.getVoiceRecordByObjectId(objectId) && !alreadyLiked) {
            let like = Like({
                vr_id: objectId,
                user: user.id,
            });
            like = await like.save();
            return like ? like : false;
        }
    }
}

module.exports = VoiceRecordService;