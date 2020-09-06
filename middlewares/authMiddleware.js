const { decryptJwtToken } = require("../controllers/auth");
const { getById } = require("../models/user");


const authMiddleWare =  async (req, res, next) => {
    try {
        const {email, userId } = decryptJwtToken(req.headers.authorization) || {};
        if(!email || !userId){
            res.boom.unauthorized("Invaild login");
        }
        const [user] = await getById(userId);
        if(!user) {
            res.boom.unauthorized("User not found");
        }
        req.user = user;
        next();
    } catch(e) {
        res.boom.unauthorized(e);
    }
}

exports.authMiddleWare = authMiddleWare;