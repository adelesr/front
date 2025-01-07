import React, { useEffect, useMemo, useState } from 'react'
import { socket } from '../utils/socket.js';
import Chatbox from './chat components/Chatbox/Chatbox.jsx';
import ChatList from './chat components/Chatlist/ChatList.jsx';
import chatDB from "../assets/Mockedchats.js"
import EmptyChatBox from './chat components/Chatbox/EmptyChatBox.jsx';
export const Context = React.createContext();
import './chat components/chatStyle.css'


const HomePage = () => {
  
  const [userMsg, setUserMsg] = useState('');
  const [currentChat, setCurrentChat] = useState();
  const [chatList, setChatList] = useState(chatDB)
  const [currentUserObject, setCurrentUserObject] = useState(
      {
      id : 25,
      userName:"Bar-amos",
      userAvatar: '../src/assets/men logo.png',
      email:'boby@gmail.com',
      isFemale:'false'
    });

  useEffect(() => {
    
    const handleReceiveMessage = (msg)=>{
      setCurrentChat((prevChat) => ({
        ...prevChat,
        messagesList: [msg,...prevChat.messagesList]
      }));
    }
    if(currentChat)
      socket.emit('join-room',currentChat.chatId)
    // chatList.map((c)=>{socket.emit('join-room',c.chatId)})
    socket.on("receiveMessage",handleReceiveMessage)
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  },[currentChat])

  const selectChatHandler = (chatId)=>{
    if(!chatId)
      setCurrentChat()
    if(currentChat){
      const tempIndex = chatList.findIndex((c)=> c.chatId===currentChat.chatId)
      chatList[tempIndex] = currentChat;
    }
    const chat = chatList.find((c)=> c.chatId===chatId)
    setCurrentChat(chat)
  }
    
    const sendMessage = () =>{
      if(userMsg){
            const message = {currentUserObject,userMsg}
            socket.emit("sendMessage",message,currentChat.chatRoomName)            
            setUserMsg("")
          }
    }
    return (
      <Context.Provider value={currentUserObject}>
        <div className='mainChatPage'>
          <div>
            {currentChat? 
              <Chatbox currentChat={currentChat} 
                        sendMessage={sendMessage}
                        setUserMsg={setUserMsg}
                        userMsg={userMsg}>
              </Chatbox>
              : <EmptyChatBox></EmptyChatBox> }
          </div>
          <>
            <ChatList enetrChat={selectChatHandler} currentChat={currentChat} chatList={chatList} ></ChatList>
          </>
        </div>
      </Context.Provider>
  )
}
export default HomePage
