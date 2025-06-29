const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

mongoose.connect('dbhere', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Database connected successfully"))
  .catch(err => console.error("❌ Database connection error:", err));

const MessageSchema = new mongoose.Schema({
    text: String,
    timestamp: { type: Date, default: Date.now },
    seenBy: { type: [String], default: [] }
});
const Message = mongoose.model('Message', MessageSchema);

const port = 7000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Socket.IO
io.on('connection', async (socket) => {
    console.log('⚡ A user connected:', socket.id);

    const messages = await Message.find().sort({ timestamp: 1 });
    socket.emit('load messages', messages);

    socket.on('chat message', async (msg) => {
        console.log(' New message:', msg);
        
        const newMessage = new Message({ text: msg });
        await newMessage.save();

        // send the new message to all clients
        io.emit('message', newMessage);
    });

    // receive message seen event
    socket.on('message seen', async ({ messageId, userId }) => {
        const message = await Message.findById(messageId);

        if (message && !message.seenBy.includes(userId)) {
            message.seenBy.push(userId); // add the user id to the seenBy array
            await message.save();

            // send the updated message to all clients
            io.emit('message seen', { messageId, count: message.seenBy.length });
        }
    });

    // receive typing event
    socket.on('typing', () => {
        socket.broadcast.emit('typing');
    });

    // receive stop typing event
    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    // disconnect event
    socket.on('disconnect', () => {
        console.log(' User disconnected:', socket.id);
    });
});

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

// Start the server
server.listen(port, () => {
    console.log(`🚀 Server listening at http://localhost:${port}`);
});
