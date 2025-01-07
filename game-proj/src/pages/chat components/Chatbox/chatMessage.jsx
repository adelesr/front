/* eslint-disable react/prop-types */
import { useContext } from "react"
import { Context } from "../../ChatHomePage"


const ChatMessage = ({messageObject}) => {
    const currentUserObject = useContext(Context)
    const messageClass = messageObject.userObject.id === currentUserObject.id ? 'sent' : 'received'
        
    return (
    <>
        <div className={`${messageClass} message `}>
            <img src={messageObject.userObject.userAvatar} alt="avatar" className='chat-img' />    
            <div>{messageObject.content}
                <p className='messageTimeStamp'>{messageObject.timeSent || "Time not available"}</p>
            </div>
            <br />
            <br />
            <br />
        </div>
    </>)
}

export default ChatMessage