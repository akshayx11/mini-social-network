const {knex} = require("./../connection");

const selectFileds = [
    "id",
    "firstName", 
    "middleName", 
    "lastName", 
    "email", 
    "mobileno", 
    "dob", 
    "dpURL", 
    "createdAt",
    "updatedAt"
];
function create({
    firstName, 
    middleName = null, 
    lastName, 
    email, 
    password, 
    mobileno = null, 
    dob = null, 
    dpURL = null
}){
    return knex('Users')
        .insert(
            {
                firstName, 
                middleName, 
                lastName, 
                email, 
                password, 
                mobileno, 
                dob, 
                dpURL, 
                createdAt: Date.now(), 
                updatedAt: Date.now()
            });
}
function getUserByEmail(email){
    return knex
        .select(['email'])
        .table('Users')
        .where({email});  
}

function getById(id) {
    return knex
        .select(selectFileds)
        .table("Users")
        .where({id});
}

function getByEmailAndPassword(email, password) {
    return knex
        .select(selectFileds)
        .table("Users")
        .where({email, password});
}

function addFriend(data){
    return knex("Friends")
        .insert(data);// (PENDING, ACCEPTED, REJECTED)
}


function updateFriendRequestStatus(userId,friendId, status) {
    return knex("Friends")
        .where(
            x => x.orWhere("ufId",`${friendId}_${userId}`)
                    .orWhere("ufId",`${userId}_${friendId}`)
        )
        .update({status});
}

function getFrineds(userId) {
    return knex.raw(`SELECT `+
    `id, firstName, middleName, lastName, email, mobileno, dob, dpURL, createdAt, updatedAt`+
    ` FROM Users as u, (SELECT friendId, userId FROM Friends WHERE status = "ACCEPTED" AND`+
    ` (userId = ${userId}  OR friendId = ${userId} )) as t1 where (u.id = t1.userId OR u.id = t1.friendId) AND u.id <> ${userId}   ;`);            
}

function checkFriendStatus(userId, friendId, status = ["ACCEPTED", "REJECTED", "PENDING"]){
    return knex("Friends")
        .select()
        .whereIn("status", status)
        .where(
            x => x.orWhere("ufId",`${friendId}_${userId}`)
                    .orWhere("ufId",`${userId}_${friendId}`)
        );
}
module.exports = {
    create, 
    getUserByEmail, 
    getById, 
    getByEmailAndPassword,
    addFriend,
    getFrineds,
    checkFriendStatus,
    updateFriendRequestStatus
};