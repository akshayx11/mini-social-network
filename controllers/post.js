const { date } = require("joi");
const { create, getPostsByUserId, deletePostById } = require("./../models/post");


const createPost = async (post , userId) => {
    const postData = {
        ...post,
        userId,
        status: "ACTIVE",
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    const [id] = await create(postData);
    return { 
        message: "Post created Successfully",
        statusCode: 200,
        data: {
            id,
            ...postData
        }
    }
};

const getUsersPosts = async userId => {
    const result = await getPostsByUserId(userId);
    return { 
        message: "Post fetched Successfully",
        statusCode: 200,
        data: result
    }
};

const deletePost = async (id, userId) => {
    const result = await deletePostById(id, userId);
    if(!result) {
        return { 
            message: "Post does not exists or aleady deleted",
            statusCode: 200
        } 
    }
    return { 
        message: "Post deleted Successfully",
        statusCode: 200
    }
};

module.exports = { createPost, getUsersPosts, deletePost }