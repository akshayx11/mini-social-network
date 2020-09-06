const {knex} = require("./../connection");


function create(data) {
    return knex("Posts")
        .insert(data);
}

function getPostsByUserId(userId, status = ["ACTIVE"]) {
    return knex("Posts")
        .select()
        .where({userId})
        .whereIn("status", status);
}

function deletePostById(id, userId) {
    return knex("Posts")
        .andWhere("userId", userId)
        .andWhere("id", id)
        .del();
}
module.exports = { create, getPostsByUserId,deletePostById }