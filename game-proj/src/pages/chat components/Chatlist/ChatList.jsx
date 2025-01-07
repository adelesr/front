/* eslint-disable react/prop-types */
import ChatListObject from "./ChatListObject"


const ChatList = ({currentChat,enetrChat,chatList}) => {
    const addChat = () =>{
        alert('This action is still in development')
    }

    return (
    <div className="chatList">
        <header >
            <h5>Chat list</h5>
        </header>
        <main>
            {chatList.map((c)=>(
                <ChatListObject 
                    key={c.chatId} 
                    chat={c} 
                    enetrChat={enetrChat}
                    currentChat={currentChat}
                    >
                </ChatListObject>
            ))}
            <button className="addBT" onClick={addChat}>+</button>
        </main>
    </div>
  )
}

export default ChatList