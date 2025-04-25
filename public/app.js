const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const senderInput = document.getElementById('sender-input');

// Function to add a message to the chat container
function addMessage(message, sender, isSent = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to send a message
async function sendMessage() {
    const message = messageInput.value.trim();
    const sender = senderInput.value.trim();
    
    if (!message || !sender) return;

    try {
        const response = await fetch('http://localhost:4000/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, sender }),
        });

        if (response.ok) {
            addMessage(message, sender, true);
            messageInput.value = '';
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Event listener for Enter key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Connect to Redis using WebSocket
const ws = new WebSocket('ws://localhost:4000');

ws.onmessage = (event) => {
    const { message, sender } = JSON.parse(event.data);
    if (sender !== senderInput.value) {
        addMessage(message, sender);
    }
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
}; 