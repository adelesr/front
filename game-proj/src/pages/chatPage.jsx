import React from 'react'
import { useNavigate } from 'react-router';
import { socket } from '../utils/socket.js';
const ChatPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      chatPage
      <button onClick={() => {
        // socket.emit('join room',11,{userName:});
        navigate('/memory-game')}
        }>Start Game</button>
    </div>
  )
}

export default ChatPage