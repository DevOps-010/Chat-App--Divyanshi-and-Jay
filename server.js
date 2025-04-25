const express = require('express');
const redis = require('redis');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Redis client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

// Connect to Redis
redisClient.connect().catch(console.error);

// Create Redis subscriber
const subscriber = redisClient.duplicate();
subscriber.connect().catch(console.error);

// Subscribe to chat channel
subscriber.subscribe('chat', (message) => {
    console.log('Received message:', message);
});

// Routes
app.post('/send', async (req, res) => {
    const { message, sender } = req.body;
    if (!message || !sender) {
        return res.status(400).json({ error: 'Message and sender are required' });
    }

    try {
        // Publish message to Redis
        await redisClient.publish('chat', JSON.stringify({ message, sender }));
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error publishing message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 