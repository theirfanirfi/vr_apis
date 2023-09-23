const Follow = require('../../models/');

class FollowerService {
  async followUser(userId, targetUserId) {
    try {
      // Check if the relationship already exists
      const existingRelationship = await Follow.findOne({
        follower: userId,
        followed_id: targetUserId,
      });

      if (existingRelationship) {
        return { message: 'Already following this user.' };
      }

      // Create a new follow relationship
      const follow = new Follow({
        follower: userId,
        followed_id: targetUserId,
      });

      await follow.save();

      return { message: 'User followed successfully.' };
    } catch (error) {
      throw new Error(`Error following user: ${error.message}`);
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
