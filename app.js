const express = require("express");
const bodyParser = require("body-parser");
const boom = require('express-boom');
const {userRouter}  = require("./routers/user");
const { authRouter } = require("./routers/auth");
const { friendRouter } = require("./routers/friend");
const { postRouter } = require("./routers/post");
const {authMiddleWare} = require("./middlewares/authMiddleware");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(boom());

app.use("/user", authMiddleWare, userRouter);
app.use("/auth", authRouter);
app.use("/friend", authMiddleWare,friendRouter);
app.use("/post", authMiddleWare, postRouter);

app.get('/', (req, res, next)=>{
    res.send("app GET request");
});
const PORT =  3009;
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`Connected on ${PORT}`);
});
