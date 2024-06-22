import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { WSURL } from '../constant';
import { useSelector } from 'react-redux';
const chatCtx = createContext({});
export const useChatContext = () => useContext(chatCtx)

export const ChatContext = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const [currentChatWith, setCurrentChatWith] = useState("6422dca2a4faa7a284b75b87");
    const [msgText, setMsgText] = useState("")
    const socket = useRef(null);
    const [isDisconnected, setIsDisconnected] = useState(1);
    const [msgData, setMsgData] = useState([]);

    const chatList = useMemo(() => [
        {
            name: "Admin",
            _id: "6422dca2a4faa7a284b75b87",
            role: "admin",
            unseenCount: 0
        },
        {
            name: "Rishab Singh",
            _id: "653d97dae18efddf392268f8",
            role: "Rishab Singh",
            unseenCount: 0
        }
    ], []);

    const sendMSG = (type, data) => {
        if (socket && socket.current) {
            if(type === "send-to-student"){
                setMsgData(p => [...p, {
                    type: "message",
                    ...data,
                    from: user?._id
                }])
            }
            socket.current.send(JSON.stringify({
                type, 
                ...{
                    ...data,
                    from: user?._id
                }
                    
            }))
        }
    }

    useEffect(() => {
        if (!user?._id) {
            setTimeout(() => {
                setIsDisconnected(p => p + 1);
            }, 2000);
            return;
        };
        const ws = new WebSocket(`${WSURL}/ws/chat`);

        ws.onopen = (ev) => {
            console.log(ev);
            sendMSG("join", {
                _id: user?._id
            })
        }

        ws.onmessage = (ev) => {
            let data = {};
            try {
                data = JSON.parse(ev?.data);
            } catch (error) {
                return;
            }
            if (data?.type === "message" && currentChatWith === data?.from) {
                console.log(data);
                setMsgData(p => [...p, data])
            }
        }

        ws.onclose = () => {
            setTimeout(() => {
                setIsDisconnected(p => p + 1);
            }, 5000)
        }

        socket.current = ws;

        return () => {
            ws.close();
        }
    }, [isDisconnected])

    console.log(msgData);

    return (
        <chatCtx.Provider value={{
            msgData, sendMSG, currentChatWith,
            setCurrentChatWith,
            msgText, setMsgText,
            chatList,
            msgData, setMsgData
        }}>
            {children}
        </chatCtx.Provider >
    )
}

export default ChatContext