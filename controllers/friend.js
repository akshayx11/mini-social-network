const { intersectionBy } = require("lodash");
const { 
    addFriend, 
    checkFriendStatus, 
    updateFriendRequestStatus, 
    getFrineds
} = require("../models/user");

const addFriendRequest =  async(userId, friendId) =>{
    const friendRequestObj = {
        userId,
        friendId,
        ufId: `${userId}_${friendId}`,
        status: "PENDING",
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    //check if friend request is already sent
    const [frData] = await checkFriendStatus(userId, friendId, ["PENDING"]);
    console.log("frData", frData);
    if(frData){
        return {
            statusCode: 403,
            message: "Friend request already sent"
        }
    }
    const data = await addFriend(friendRequestObj);
    return {
        statusCode: 200,
        message: "Friend request sent"
    }
}
const responseFrinedRequest = async(userId, friendId, response) => {
    await updateFriendRequestStatus(userId, friendId, response);
    return {
        statusCode: 200,
        message: `Friend request ${response.toLowerCase()}`
    }
};
const getFriendsList = async userId => {
    const [friends] = await getFrineds(userId);
    return {
        statusCode: 200,
        message: "friend list fetched",
        data: friends
    }
}
const getMutualFriends = async (userId, friendId) => {
    const [userFrineds] = await getFrineds(userId);
    const [frinedFrineds] = await getFrineds(friendId);
    const mutualFriends = intersectionBy(userFrineds, frinedFrineds, "id");
    return {
        statusCode: 200,
        message: "mutual friend list fetched",
        data: mutualFriends
    }
}
module.exports = { addFriendRequest, responseFrinedRequest, getFriendsList, getMutualFriends};