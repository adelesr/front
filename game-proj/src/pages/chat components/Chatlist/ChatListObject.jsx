/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Context } from "../../ChatHomePage";

const ChatListObject = ({ enetrChat, currentChat, chat }) => {
  const currentUserObject = useContext(Context);
  const [chatImage, setChatImage] = useState();
  const [chatTitle, setChatTitle] = useState();
  // const [firstMsg, setFirstMsg] = useState(chat.messagesList[(chat?.messagesList.length-1)])
  const [firstMsg, setFirstMsg] = useState();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    setChatImage(
      !chat.isGroup ? avatarFinder() : "../src/assets/Images/chat_Images/group image.png"
    );
    setChatTitle(!chat.isGroup ? nameFinder() : "Group chat");
    setSelected(currentChat && currentChat.chatId === chat.chatId);
    // setFirstMsg(chat.messagesList[(chat.messagesList.length-1)])
    setFirstMsg(
      chat?.messagesList.length > 0
        ? chat?.messagesList?.[chat.messagesList.length - 1].content
        : "didnt secceed to find first message"
    );
    // alert(chat.messagesList.length);
  }, [currentChat, chat.messagesList.length]);

  const clickHandler = () => {
    if (selected) enetrChat();
    else enetrChat(chat.chatId);
  };
  const avatarFinder = () => {
    const user = chat.Participants.find(
      (user) => user.id !== currentUserObject.id
    );
    return user ? user.userAvatar : null;
  };
  const nameFinder = () => {
    const user = chat.Participants.find(
      (user) => user.id !== currentUserObject.id
    );
    return user ? user.userName : null;
  };

  return (
    <div
      className={`${selected ? "chatSelected" : ""} ChatListObject`}
      onClick={clickHandler}
    >
      <img className="chat-img" src={chatImage} alt="chat image"></img>
      <div>
        <h6>{chatTitle}</h6>
        <p>{chat?.messagesList.length > 0
        ? chat?.messagesList?.[chat.messagesList.length - 1].content
        : "Empty chat"} </p>
        {/* <p>{firstMsg || "Empty chat"} </p> */}
      </div>
    </div>
  );
};

export default ChatListObject;
