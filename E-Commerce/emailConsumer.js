import {Kafka } from 'kafkajs'
const kaf = new Kafka({clientId:'email-app',brokers:['localhost:9092']})
const consumer  = kaf.consumer({groupId:'email-group'})


const run=async ()=>{
    await consumer.connect()
    await consumer.subscribe({topic:"emails",fromBeginning:true})
    await consumer.run({
        eachMessage: async ({message})=>{
            const email = JSON.parse(message.value)
            console.log('sending email to',email.to ,'|',`subject:${email.sub}`);
            
        }
    })

}

run()