const express = require('express');
const amqp = require('amqplib/callback_api');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

// Conectar a RabbitMQ
amqp.connect('amqp://rabbitmq', (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'translation_queue'; // Debe coincidir con la cola en el microservicio de traducción

        channel.assertQueue(queue, {
            durable: false
        });

        // Consumir mensajes de la cola
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log("Received:", msg.content.toString());
                // Aquí puedes procesar el mensaje o realizar alguna acción en la base de datos
                channel.ack(msg);
            }
        });
    });
});

app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`Comment service running on port ${PORT}`);
});
