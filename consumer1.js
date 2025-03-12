const {Kafka}=require('kafkajs')

const kafka = new Kafka({clientId:'consumer1',brokers:['localhost:9092'] })

const consumer  = kafka.consumer({groupId:'orderGroup'})
const runConsumner = async ()=>{
    await consumer.connect()
    console.log('consumer1 connect')
    await consumer.subscribe({topic:'orders',fromBeginning:true})
    await consumer.run({
        eachMessage: async({topic,partition,message})=>{
            console.log(`consumer 1 received from partition ${topic} ${partition}`,{
            key:message.key.toString(),
            value:message.value.toString()
        })
        }
    }) 
} 

runConsumner().catch((err)=>console.log(err.message));

 