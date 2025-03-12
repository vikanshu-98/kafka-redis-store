const {Kafka} = require('kafkajs')
const kaf = new Kafka({clientId:'consumer2',brokers:['localhost:9092']})
const consumer2 = kaf.consumer({groupId:'orderGroup'})
const runConsumer2 = async()=>{
    await consumer2.connect()
    console.log('consumer2 connect');
    await consumer2.subscribe({topic:'orders',fromBeginning:true})
    await consumer2.run({
        eachMessage:async ({topic,partition,message})=>{
            console.log(`consumer 2 receiverd from partition ${partition}`,{key:message.key.toString(),value:message.value.toString()});
            
        }
    })

    
}

runConsumer2().catch((err)=>console.log(err.message));