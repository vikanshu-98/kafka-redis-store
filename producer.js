const {Kafka}=require('kafkajs')
const express = require('express')

const app = express()
app.use(express.json())

const kafka = new Kafka({clientId:'order-service',brokers:['localhost:9092']})
const producer = kafka.producer()

const startProducer = async ()=>{
    try {  
        await producer.connect() 
        console.log('kafka producer connected!!!');   
        for(let i=1;i<=5;i++){
            const orderId = `order-${i}`;
            await producer.send({ 
                topic:'orders',
                messages:[{key:String(orderId),value:  JSON.stringify({ orderId, product: 'mobile', quantity: i }), partition:i%3}],
                
            })
            console.log(`order sent: ${i}`);
            console.log(`status:'order placed',${i}`);
        }
         
        await producer.disconnect()
    } catch (error) {
        console.log('error in producer',error);
          
    }
     

} 

startProducer()

app.get('/',(req,res)=>{
    return res.end('sdsd')
})
  

app.listen(300,()=>console.log('service runing on port 3000'))  
 
 