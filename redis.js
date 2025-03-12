const Redis = require('ioredis')

const redis =new Redis()

const sendMessage=(message)=>{
    redis.publish('chat-room',JSON.stringify({user:'alice',text:message}))
    console.log('message sent!');
    
}

sendMessage('hello bob!')


const redisSub = new Redis()
redisSub.subscribe('chat-room')
redisSub.on('message',(channel,message)=>{
    console.log(`new chat message in ${channel}`);
    

})

// what is kakfa?
// kafka is an distibuted event srtream platform designed for high throughput,falut tolereant and scalable event driven arci. it is used for log aggre.,real time analysis,stream processing,event drivern microservies.

// what is redis?
// redis(remote dic. server ) is in memory data stru. sore that is used as a cache,message broker or real time database. redis pub/sub enable message broadcasting but it is not a reliable or presistnat as kafka


//acrcite pf kafka 
// 1. producer -> publish the message to topics 
// 2, broker -> kafa servert that stores and mange topic
// 3 topic and partitoin - topic store messsage and partition allow paralel processing
// 4 consumenr -> read message from topic asyn.
//5. zookeeper -> manages cluster coordination 

// redis pub and sub arc
// publisher -> send message over a channer
// subsscriber -> listen to specific channel and receive message a real time 
// no storage -> message are lost if no subscriber is online 



// when to user kafaka vss redis
// realtime stream -> kafka 
// event drivern mircroserveie -> kafka
//message durability -> kafka
//real time notification -> redis
// large amount of afata -> kafka (handle tbs of data) 
// temp. message broadcase -> redis( low latency pub/sub)


//zookeper
// apache kafka use the zookeepr for maintaining and coordinating the distrubited component. it play a curcial role to maintain the meta data and health of clusturs
//resposibitlies of zookeper in kafka
//1. broker management  :- track all the broker present in the clustur , when a broker join or leave the clustur then zookeper notify kakfa
//2. Lead election :- assogn a leader for each partition to esure high availabilirt, if broker (leader) fails then it help to elect a new leader
//3. Topic and partitoin mgmt:- store the metadata of partiotion and topic
// 4. access control :- help to manage the security bt storing control list for authentication and authrozation 
// config. mgmt:- store cofig. setting for kafa brokers
