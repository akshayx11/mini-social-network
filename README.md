# social-network-node
A social network APIs
> Joi validator is used to handle data in requests
## Auth APIs
### Register
API: '/auth/signup'\
requestType: POST
body: 
```
{
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  dpURL: Joi.string(),
  mobileno: Joi.string(),
  dob: Joi.number().required()
}
```
### Login
API: '/auth/login'\
requestType: POST\
body: 
```
{
  email: Joi.string().required(),
  password: Joi.string().required()
}
```
### create jwt token
API: '/auth/jwt'
body:
```
{
  email: Joi.string().required(),
  userId: Joi.number().required()
}
```
Note: use jwt in headers.authorization

# Users APIs
### Fetch user
API: '/user'\
Note: pass appropriate jwt

# Friends APIs
### Send frined request
API: '/friend/friend-request/:friendId'\
requestType: POST

### Response to friend request
API: '/friend/response-request'\
requestType: PUT
body:
```
{
  friendId: Joi.string().required(),
  response: Joi.string().valid("ACCEPTED","REJECTED", "REMOVED").required()
}
```
Note: User can accept frined request <ACCEPTED>, reject frined request <REJECTED> and user can remove existing friend <REMOVED>

### View frineds list
API: '/friend/friends-list'\
requestType: GET\
Note: gives the frined list of logged in user

### See mutual frineds
API: '/friend/mutual-friends/:frinedId' \
requestType: GET \
Note: pass friend's id <friendId> to see mutual friends

# Posts

### Create post
API: '/post' \
requestType: POST
body:
```
{
  post: Joi.string().required(),
  privacy: Joi.string().valid("PUBLIC", "PRIVATE", "FRIENDS").required()
}
```
### Get logged in user's post
API: '/post' \
requestType: POST

### Delete post
API: '/post/:id' \
requestType: DELETE \
Note: pass the post `id` to delete the post. User can delete only his/her post.

