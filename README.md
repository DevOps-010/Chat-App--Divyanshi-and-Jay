# Redis Chat App

A real-time chat application built with Redis Pub/Sub, Node.js, and vanilla JavaScript.

## Features

- Real-time messaging using Redis Pub/Sub
- Simple and clean UI
- Docker containerization
- Scalable architecture

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Run the application using Docker Compose:

```bash
docker-compose up --build
```

4. Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Architecture

- Frontend: Vanilla JavaScript (port 3000)
- Backend: Node.js with Express (port 4000)
- Redis: Pub/Sub messaging (port 6379)

## How to Use

1. Open the application in your browser
2. Enter your name in the "Your name" field
3. Type your message and press Enter or click Send
4. Messages will appear in real-time for all connected users

## Development

To run the application in development mode:

```bash
docker-compose up --build
```

The application will automatically reload when you make changes to the code. 