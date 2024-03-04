const Follower = require('../../models/follow_model');
const User = require('../../models/user_model');

class FollowerService {
  static followUnFollowUser = async (userId, username) => {

    let user_to_be_followed = await User.findOne({username: username});

    if(user_to_be_followed){
      // console.log("User to be followed", user_to_be_followed);
    try {
      // Check if the relationship already exists
      const existingRelationship = await Follower.findOne({
        follower: userId,
        followed_id: user_to_be_followed._id,
      });

      console.log('existingRelationship', existingRelationship);
      if (existingRelationship) {
        let deletedRelationship = await Follower.findOneAndDelete({
          follower: userId,
          followed_id: user_to_be_followed._id,
        });

        if(deletedRelationship){
          return { status: 200, isFollowed: false, isUnFollowed: true,  message: 'User is unfollowed.' };

        }else {
          return {status: 501, isFollowed: false,isUnFollowed: false,  message: 'Action could not be performed. Please try again.'  }
        }
      }else {
      // Create a new follow relationship
      const follow = new Follower({
        follower: userId,
        followed_id: user_to_be_followed._id,
      });

      await follow.save();

      return { status: 200, isFollowed: true, isUnFollowed: false,  message: 'User followed.' };
      }


    } catch (error) {
      return {status: 501, isFollowed: false,isUnFollowed: false,  message: 'Action could not be performed. Please try again.'  }

    }
  }else {
    return {status: 501, isFollowed: false,isUnFollowed: false,  message: 'Action could not be performed. Please try again.'  }

  }
  }

  async unfollowUser(userId, targetUserId) {
    try {
      // Check if the relationship exists and delete it
      const existingRelationship = await Follow.findOneAndDelete({
        follower: userId,
        followed_id: targetUserId,
      });

      if (existingRelationship) {
        return { message: 'User unfollowed successfully.' };
      } else {
        return { message: 'User was not being followed.' };
      }
    } catch (error) {
      throw new Error(`Error unfollowing user: ${error.message}`);
    }
  }

  async getFollowersAndFollowed(userId) {
    try {
      const followers = await Follow.aggregate([
        {
          $match: { followed_id: userId },
        },
        {
          $lookup: {
            from: 'users', // Assuming your users collection is named 'users'
            localField: 'follower',
            foreignField: '_id',
            as: 'followerInfo',
          },
        },
        {
          $project: {
            followerInfo: { password: 0 }, // Exclude sensitive fields from user documents
          },
        },
      ]);

      const followed = await Follow.aggregate([
        {
          $match: { follower: userId },
        },
        {
          $lookup: {
            from: 'users', // Assuming your users collection is named 'users'
            localField: 'followed_id',
            foreignField: '_id',
            as: 'followedInfo',
          },
        },
        {
          $project: {
            followedInfo: { password: 0 }, // Exclude sensitive fields from user documents
          },
        },
      ]);

      return { followers, followed };
    } catch (error) {
      throw new Error(`Error fetching followers and followed: ${error.message}`);
    }
  }
}

module.exports = FollowerService;
