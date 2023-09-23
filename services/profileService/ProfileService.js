const User = require('../../models/user_model');

class ProfileService {
    static getUserProfile = async (user_name, loggedInUserId) => {
        try {
          const result = await User.aggregate([
            {
              $match: { username: user_name },
            },
            {
              $lookup: {
                from: 'follows', // Assuming your follows collection is named 'follows'
                localField: '_id',
                foreignField: 'followed_id',
                as: 'followers',
              },
            },
            {
              $lookup: {
                from: 'follows', // Assuming your follows collection is named 'follows'
                localField: '_id',
                foreignField: 'follower',
                as: 'following',
              },
            },
            {
              $lookup: {
                from: 'voicerecords', // Assuming your voice records collection is named 'voicerecords'
                localField: '_id',
                foreignField: 'user',
                as: 'voiceRecords',
              },
            },
            {
              $project: {
                username: 1,
                email: 1,
                created_at: 1,
                updated_at: 1,
                isMyProfile: { $eq: ['$_id', loggedInUserId] },
                // Add other user fields you want to include
                followers: { $size: '$followers' },
                following: { $size: '$following' },
                voiceRecords: { $size: '$voiceRecords' },
                // voiceRecordsList: '$voiceRecords',
              },
            },
          ]);
    
          if (result.length === 0) {
            return false
          }
    
          return result[0];
        } catch (error) {
          return false;
        }
      }
}

module.exports = ProfileService;