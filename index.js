const express = require('express');
const {connection}= require('./db');
const {userRouter}= require("./routes/user.routes");
const {listRouter}= require('./routes/list.routes');

const app = express();

app.use(express.json());
app.use('/user',userRouter);
app.use('/list',listRouter)

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(4500,async()=>{
 try{
    await connection,
    console.log("connected to DB");
    console.log("Server is runnig at the port 4500")
 }catch(err){
    console.log(err)
 }
})