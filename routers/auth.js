const express = require("express");
const { loginValidate, jwtValidator } = require("../validators/auth");
const { responseHandler } = require("../utils/utils");
const {authorizeUser, generateJwtToken} = require("../controllers/auth");
const { signUp } = require("../controllers/user");
const { userSignupValidate } = require("../validators/user");
const router = express.Router();

router.post('/signup', async (req, res, next) =>{
    try{
        const {error, value: data } = userSignupValidate.validate(req.body);
        if(error) {
            return res.boom.badRequest(error.message);
        }
        const {
            statusCode,
            data: userData,
            message,
        } = await signUp(data);
        responseHandler({res, data: userData, statusCode, message});
    }catch(e){
        res.send("Error occured: "+ e);
        next(e);
    }
    
});
router.post("/login", async(req, res, next) =>{
    try{
        const {error, value } = loginValidate.validate(req.body);
        if(error){
            return res.boom.badRequest(error);
        }
        const result = await authorizeUser(value);
        responseHandler({res,...result});
    }catch(e){
        res.send("Error occured: "+ e);
        next(e);
    }
});

router.post("/jwt", (req, res, next) =>{
    try{
        const { error } = jwtValidator.validate(req.body);
        if(error) {
            res.boom.badRequest(error);
        }
        res.send(generateJwtToken(req.body));

    }catch(e){
        res.send("Error occured: "+ e);
        next(e);
    }
});
exports.authRouter = router;