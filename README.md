﻿# Websockets Chat Documentation
#####**************https://yearling-delores-abdalrhmangroup-bb8cfd33.koyeb.app/******************
## Introduction
This is a real-time chat application built using **Node.js, Express, MongoDB, and Socket.IO**. The project allows users to send and receive messages instantly while tracking message reads and displaying typing indicators.

## Features
- Real-time message transmission using **WebSockets (Socket.IO)**
- Displays **typing indicators** when a user is typing
- **Message read receipts** with tracking of who has seen a message
- Messages are **persisted in MongoDB**
- Uses **local storage** to identify users
- Simple and responsive **frontend UI** built with **HTML, CSS, and JavaScript**

---
## Project Structure
```
websockets-chat/
│── server/
│   ├── index.js            # Main server file (Node.js + Express)
│   ├── models/
│   │   ├── Message.js      # Mongoose schema for messages
│── client/
│   ├── index.html          # Frontend UI (Chat interface)
│── package.json            # Dependencies and project metadata
│── README.md               # Project documentation
```

---
## Technologies Used
### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for handling HTTP requests
- **MongoDB** - Database for message storage
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - WebSockets for real-time communication

### Frontend
- **HTML/CSS** - Basic UI structure and styling
- **JavaScript** - Handles client-side socket events

---
## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+ recommended)
- **MongoDB** (Atlas or Local instance)

### Steps to Run
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/websockets-chat.git
   cd websockets-chat
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Setup MongoDB Connection**
   - Edit `index.js` and replace the MongoDB connection string with your own.
4. **Start the server**
   ```bash
   node server/index.js
   ```
5. **Open the client in the browser**
   - Open `client/index.html` in a web browser
   - OR use a local server (e.g., `Live Server` extension in VSCode)

---
## API & Socket.IO Events
### Server Events
| Event Name       | Description |
|-----------------|-------------|
| `chat message`  | Broadcasts a new chat message |
| `typing`        | Notifies others that a user is typing |
| `stopTyping`    | Removes typing indicator |
| `message seen`  | Updates the seen status of a message |

### Client Events
| Event Name       | Description |
|-----------------|-------------|
| `load messages` | Loads chat history from MongoDB |
| `message`       | Displays a new incoming message |
| `message seen`  | Updates the UI when a message is read |
| `typing`        | Shows a typing notification |
| `stopTyping`    | Removes typing notification |

---
## Future Improvements
- User authentication (Login/Signup)
- Private chats and group messaging
- Message deletion and editing
- Enhanced UI design using a frontend framework (React, Vue, etc.)

---
## Contributors
- **Your Name** - Developer
- **Contributor 2** - Role (if applicable)

---

