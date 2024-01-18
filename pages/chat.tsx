import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackBar } from "@/components/SnackBar";
import io from 'socket.io-client';
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { Field } from "@/components/Form/Field";
import { Button, FormControl, InputLabel, MenuItem, Select, Stepper, TextField } from "@mui/material";
import 'react-chat-elements/dist/main.css';
import { MessageBox, ChatList } from 'react-chat-elements';


export default function Chat() {
    const { data }: { data: Session | null } = useSession();
    const [messages, setMessages] = useState<any[]>([]);
    const [userIsWriting, setUserIsWriting] = useState<boolean>(false);
    const useAlert: any = useSnackBar();
    const [messageElementsfull, setmessageElementsfull] = useState([]);

    const [sidekick_name, setsidekickName] = useState("sidekick");
    const [avatar, setAvatar] = useState("../Theo.png");
    const [socket, setSocket] = useState<any>(null);

    async function Message_array(number_of_messages: number, response: { data: any[]; }) {
        var messageElements = [];
        for (let i = 0; i < number_of_messages; i++) {
            const message = response.data[i];
            messageElements.push(
                <MessageBox
                    position={message.to === data?.user.id ? "left" : "right"}
                    type={"text"}
                    title={message.to === data?.user.id ? sidekick_name : "Moi"}
                    text={message.content}
                />
            );
        }
        setmessageElementsfull(messageElements);
    }

    useEffect(() => {
        (async () => {
            if (!data?.user.access_token) return;

    const response_name = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user_infos/sidekick`, {
        headers: {
            Authorization: `Bearer ${data?.user.access_token}`
        }
    });
    setsidekickName(response_name.data.firstname)
    setAvatar(response_name.data.avatar)

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/all`, {
        headers: {
            Authorization: `Bearer ${data?.user.access_token}`
        }
    });

    var number_of_messages = response.data.length
    setMessages(response.data);
    Message_array(number_of_messages, response);

    const newSocket = io("https://api.sidekickapp.live", {
        auth: {
            token: data?.user.id
        }
    });
    setSocket(newSocket);

    const setupSocketListeners = (socket: any) => {
        socket.on('message', (data: any) => {
            messages.push(data);
            console.log('Message received: ' + data);
            console.log(messages)
            const newMessageElement = (
                <MessageBox
                    position="left"
                    type="text"
                    title={sidekick_name}
                    text={data}
                />
            );
            setmessageElementsfull((prevElements) => [...prevElements, newMessageElement]);
        });

        socket.on('writing', (data: any) => {
            setUserIsWriting(data);
            console.log('Writing received: ' + data);
        });

        socket.on('seen', (data: any) => {
            messages.find((message: any) => message.id === data.id).seen = true;
            console.log('Seen received: ' + data);
        });

        socket.on('match', (data: any) => {
            console.log('Match received: ' + data);
        });

        socket.on('reconnect', (data: any) => {
            console.log('Match received: ' + data);
        });

        socket.on('connect', () => {
            console.log('Connecté au serveur Sidekick');
        });
    }

    if (data?.user.access_token) {
        setupSocketListeners(newSocket);
    }

    return () => {
        newSocket.off();
        newSocket.disconnect();
        console.log("Disconnected from server");
    }
        })();
    }, [data?.user.access_token]);


    async function sendMessage(message: string): Promise<void> {
        try {
            console.log(message)
            console.log(socket.emit('message', message));
        } catch (err: any) {
            if (err.response) {
                useAlert(err.response.data.message, "error");
            } else {
                useAlert(err.message, "error");
            }
        }
    }

    const ChatForm = ({ sendMessage }) => {
        const [messageInput, setMessageInput] = useState('');

        const handleMessageChange = (e) => {
            setMessageInput(e.target.value);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            sendMessage(messageInput);

            const newMessageElement = (
                <MessageBox
                    position="right"
                    type="text"
                    title="Moi"
                    text={messageInput}
                />
            );

            setmessageElementsfull((prevElements) => [...prevElements, newMessageElement]);

            setMessageInput('');
        };

        return (
            <div className="ktq4 text-center flex items-center justify-center">
                <form onSubmit={handleSubmit} className="flex items-center">
                <Field >
                    <div className="pt-2 text-start flex flex-col max-w-5x">
                        <input
                            type='text'
                            value={messageInput}
                            onChange={handleMessageChange}
                            placeholder="Enter your message..."
                            className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                            required
                        />
                    </div>
                </Field>
                <Button type='submit' variant="contained" className="ml-4 h-14 flex bg-orangePrimary">
                    Send
                </Button>
            </form>
            </div>
        );
    };

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
                    <div className="ktqChat text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <img src={avatar} alt="Avatar de profil" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        </div>
                        <div>{sidekick_name}</div>
                        <div style={{ color: 'red' }}>Sidekick</div>
                    </div>
                    <div className="ktq4 text-center ">
                        {messageElementsfull}

                    </div>
                    <ChatForm sendMessage={sendMessage} />

                </div>
            </section >
        </div >
);}