const { create, getUserByEmail, getById } =  require("../models/user");
const { encryptData, generateJwtToken } = require("./auth");

const signUp = async(userDetails) => {  
    // check user already exists or not
    const email = await getUserByEmail(userDetails.email);
    if(email.length){
        return { 
            message: "email already exists",
            error: "forbidden",
            statusCode: 403
        }
    }
    userDetails.password = encryptData(userDetails.password);
    const id  = await create(userDetails);
    //delete paswrod
    delete userDetails.password;
    return {
        data: { id: id[0], ...userDetails},
        message: "Successfully Added",
        statusCode: 200
    } 
}

const getUserById = async id => {
    const [userData] = await getById(id) || [];
    if(!userData){
        return {
            statusCode: 404,
            message: "user not found"
        };
    }
    delete userData.password;
    return {
        statusCode: 200,
        data: userData
    };
}

module.exports = { signUp, getUserById, generateJwtToken};