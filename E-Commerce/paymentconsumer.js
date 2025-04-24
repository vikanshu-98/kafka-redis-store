import { json } from 'express';
import {Kafka} from 'kafkajs'

const kafa= new Kafka({clientId:'payment-app',brokers:['localhost:9092']});
const consumer = kafa.consumer({groupId:'payment-group'})
const producer = kafa.producer()

const run = async ()=>{
    await consumer.connect()
    await producer.connect()
    await consumer.subscribe({topic:'orders',fromBeginning:true})
    await consumer.run({
        eachMessage: async ({topic,partition,message})=>{
            const mess = JSON.parse(message.value) 
            console.log('payment is processing for the order id ',mess.orderId); 
            const emailOb={
                to:'abc@yopmail.com',
                sub:"payment sucess",
                body:`you payment of ${mess.amount} is confirmed`

            }
            await producer.send({
                topic:'emails',
                messages:[{key:'email',value:JSON.stringify(emailOb)}]
            })

            await producer.disconnect()
            await consumer.disconnect()
            console.log('email req sent for order',mess.orderId);
            

        }
    })
}

run()