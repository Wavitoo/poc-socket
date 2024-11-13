import { Chat } from './chat.ts';

const socket = io();
const chat = new Chat(socket);

const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        chat.emit_data(message);
        chat.append_data(`Me: ${message}`);
        messageInput.value = '';
    }
});

socket.on('data', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});

socket.on('user_connect', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
});

chat.emit_data('Hello World!');
