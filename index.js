const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const cors = require('cors')
let RedisStore = require('connect-redis')(session)


const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT, REDIS_IP, SESSION_SECRET } = require('./config/config')

let redisClient = redis.createClient({
    port : REDIS_PORT ,
    host : REDIS_IP
})
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const app = express()


mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    
    mongoose.connect(mongoURL , {useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify:false })
    .then(()=>console.log('Succesfully connected to DB'))
    .catch((e)=>{
        console.log(e)
        setTimeout(connectWithRetry , 5000)
    })
}

connectWithRetry()
app.enable('trust proxy')
app.use(cors({}))
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET ,
    cookie:{
        secure:false,
        resave:false,
        saveUninitialized:false ,
        httpOnly:true ,
        maxAge:3000000
    }
      
    })
  )

  app.get('/api/v1',(req,res)=>{
      res.send('<h1>markomandicjebog!!!!!!!!!!! sdfsdfsdf</h1>')
      console.log('It hitted me')
  })


app.use(express.json())
app.use('/api/v1/posts' , postRouter)
app.use('/api/v1/users' , userRouter)


port = process.env.port || 3000
app.listen(port, ()=> console.log(`App is listening on port ${port}`))