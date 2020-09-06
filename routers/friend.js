const express = require("express");
const router = express.Router();

const { addFriendRequest, responseFrinedRequest, getFriendsList, getMutualFriends } = require("../controllers/friend");
const { responseHandler } = require("../utils/utils");
const { friendResponseValidator } = require("../validators/friend");


router.post("/friend-request/:friendId", async(req, res, next) =>{
    try{
        const { friendId } = req.params;
        const {id: userId} = req.user;
        if(!userId || !friendId) {
            res.boom.badRequest("Invalid request");
        }
        const result = await addFriendRequest(userId, friendId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

router.put("/response-request", async(req, res, next) => {
    try {
        const { id: userId} = req.user;
        const { error } = friendResponseValidator.validate(req.body);
        if(error) {
            res.boom.badRequest(error);
        }
        const { friendId, response } = req.body;
        const result = await responseFrinedRequest(userId, friendId, response);
        responseHandler({res,...result});
    }catch(e) {
        res.send("Error occured: "+e);
    }
});

router.get("/friends-list", async(req, res, next) =>{
    try{
        const { id: userId } = req.user;
        if(!userId) {
            res.boom.badRequest("Invalid request");
        }
        const result = await getFriendsList(userId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

router.get("/mutual-friends/:friendId", async(req, res, next) =>{
    try{
        const { id: userId } = req.user;
        const { friendId } = req.params;
        if(!userId) {
            res.boom.badRequest("Invalid request");
        }
        const result = await getMutualFriends(userId, friendId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

exports.friendRouter = router;