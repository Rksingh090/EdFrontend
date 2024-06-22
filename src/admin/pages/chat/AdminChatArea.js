import React from 'react'
import "./chat.css";
import { useChatContext } from '../../../context/ChatContext';
import { useSelector } from 'react-redux';
import { MdOutlineRemoveRedEye } from "react-icons/md";

const AdminChatArea = () => {
    const { user } = useSelector((state) => state.user);

    const {
        sendMSG, msgText, chatList, setMsgText,
        currentChatWith, setCurrentChatWith, msgData
    } = useChatContext();

    const sendMsgToPersonGroup = (e) => {
        e.preventDefault();
        sendMSG("send-to-student", {
            _id: currentChatWith,
            message: msgText,
        });
        setMsgText("")
    }


    return (
        <div className='adminChatArea'>
            <div className="ChatBoxContainerWrapper">
                <div className='ChatBoxTools'>
                    <input type="text" placeholder="Chat with.." className='ChatWithInput' autoComplete="off" />
                </div>
                <div className="ChatBoxContainer">
                    <ul className='MainChatList'>
                        {chatList.map((item, idx) => {
                            return (
                                <li key={idx} onClick={() => setCurrentChatWith(item?._id)} className={`ChatPersonGroupItem ${currentChatWith === item?._id ? "active" : ""}`}>
                                    <div className='ChatPersonGroupItemAvatar'>
                                        {/* <img src='/aad.jpg' /> */}
                                    </div>
                                    <div className='ChatPersonGroupItemNameRole'>
                                        <p className='name'>{item?.item}</p>
                                        <p className='role'>{item?.role}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='MainChatMsgBox'>
                        <div className='ChatMessageArea'>
                            {msgData.map((item, idx) => {
                                return (
                                    <div className={`message ${user?._id === item?.from ? "me" : "other"} `}>
                                        <p>{item?.message}</p>
                                        {user?._id === item?.from && (
                                            <span className='my-message-status'>
                                                <MdOutlineRemoveRedEye size={12} />
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <form className='MainChatMsgBoxEnd' onSubmit={sendMsgToPersonGroup}>
                            <input

                                type="text"
                                className='ChatMsgInput'
                                placeholder='Write Message..'
                                value={msgText}
                                onChange={(e) => setMsgText(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminChatArea