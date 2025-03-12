const express  = require('express')
const redis =  require('redis')
const redisClient  = redis.createClient()

redisClient.connect()

const app = express()
app.get('/order/:id',async (req,res)=>{
    const order = await redisClient.get(`order:${req.params.id}`)
    
    if(order){
        return res.json(JSON.parse(order))
    }else{
        return res.status(404).send({'error':'order not found'})
    }
})
app.listen(4000,()=>console.log(`listen on port number 4000`))