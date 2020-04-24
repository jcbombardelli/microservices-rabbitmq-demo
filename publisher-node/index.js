console.log("Init Publisher")

const amqp = require('amqplib')

const url = 'localhost'
const port = '5672'
const queue = 'jobs'
const message = { number: 42 }

const connect = async () => {
    try {
        const connection = await amqp.connect(`amqp://localhost:5672`)
        return await connection.createChannel()
    } catch (ex) {
        throw ex
    }
}

const sendToQueue = async (bufferMessage, queue, channel) => {
    try {
        const result = await channel.assertQueue(queue)
        channel.sendToQueue(queue, bufferMessage)

    } catch (ex) {
        throw ex
    }
}


connect()
    .then(channel => {
        sendToQueue(Buffer.from(JSON.stringify(message)), 'queue', channel)
            .then(() => console.log('message successfully sended:', message))
    }).catch(ex => {
        console.error(ex)
    })


module.exports = {
    connect
}