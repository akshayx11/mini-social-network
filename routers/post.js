const express = require("express");
const router = express.Router();

const { postValidator } = require("../validators/post");
const { responseHandler } = require("../utils/utils");
const { createPost, getUsersPosts, deletePost } = require("../controllers/post");

router.post("/", async(req, res) => {
    try{
        const { error } = postValidator.validate(req.body);
        if(error) {
            res.boom.badRequest(error);
        }
        const {id: userId} = req.user;
        const result = await createPost(req.body, userId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

router.get("/", async(req, res) => {
    try{
        const {id: userId} = req.user;
        const result = await getUsersPosts(userId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
    }
});

router.delete("/:id", async(req, res) =>{
    try{
        const { id } = req.params;
        const {id: userId } = req.user;
        const result = await deletePost(id, userId);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+e);
    }
} );

exports.postRouter = router;