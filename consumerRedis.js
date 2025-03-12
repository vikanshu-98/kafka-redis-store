const redis = require('redis')
const {Kafka} =  require('kafkajs')


const kafka = new Kafka({clientId:'consumer-1',brokers:['localhost:9092']})
const consumer =  kafka.consumer({groupId:'orders-consumer'})
const redisClient  =  redis.createClient()
redisClient.connect()
const startConsumer =async () =>{
    await consumer.connect()
    console.log('consumer is connected..');
    await consumer.subscribe({topic:'orders',fromBeginning:true})
    consumer.run({
        eachMessage:async({topic,partition,message})=>{
            const order  = JSON.parse(message.value.toString())
            console.log(`order received ${order.orderId}`);
            redisClient.set(`order:${order.orderId}`,JSON.stringify(order))
            console.log(`order is stored in redis ${order.orderId}`);
            
        }
    })
    
}

startConsumer()