const express  = require('express') 
const {Kafka} = require('kafkajs')
const app = express() 
app.use(express.json())

const kafka = new Kafka({clientId:'producer-redis',brokers:['localhost:9092']})
const producer = kafka.producer()

startProducer = async ()=>{
    await producer.connect()
    console.log('producer is connected!!');
    
}

startProducer()


app.post('/order',async (req,res)=>{
    const {orderId,product,quantity} = req.body
    await producer.send({
        topic:'orders',
        messages:[{key:String(orderId),value:JSON.stringify({orderId,product,quantity})}]
    })
    console.log(`order sent to consumer ${orderId}`);
    res.json({'message':'order created',orderId}) 
})
app.listen(3000,()=>console.log(`listen on port number 3000`))