import {Kafka} from 'kafkajs'

const kafka  = new Kafka({clientId:'order-app',brokers:['localhost:9092']})
const producer =kafka.producer()
 

const produce = async()=>{
    try { 
        await producer.connect()
        console.log('producer connected..');
        
        const order={orderId:'123456',amount:250}
        await producer.send({
            topic:'orders', 
            messages:[{key:order.orderId,value:JSON.stringify(order)}]
        }) 
        console.log('order sent to orders topic..');
        await producer.disconnect()
    } catch (error) {
        console.error(error)
    } 
}
produce()