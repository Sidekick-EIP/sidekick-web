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
    var messageElements = [];
    const [sidekick_name, setsidekickName] = useState("Julesaoz");
    const [avatar, setAvatar] = useState("../Theo.png");
    const [myID, setMyId] = useState("1");
    const [sidekickId, setsidekickId] = useState("1");

    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const sockets = io("https://api.sidekickapp.live", {
            transports: ["websocket"],
            auth: {
                token: data?.user.access_token
            }
        });

        setSocket(sockets);

        try {
            sockets.on('connection', () => {
                sockets.on('message', (data: any) => {
                    messages.push(data);
                    console.log('Message received: ' + data);
                });

                sockets.on('writing', (data: any) => {
                    setUserIsWriting(data);
                    console.log('Writing received: ' + data);
                });

                sockets.on('seen', (data: any) => {
                    messages.find((message: any) => message.id === data.id).seen = true;
                    console.log('Seen received: ' + data);
                });

                sockets.on('match', (data: any) => {
                    console.log('Match received: ' + data);
                });

                sockets.on('reconnect', (data: any) => {
                    console.log('Match received: ' + data);
                });
                console.log('Connecté au serveur Sidekick');
                sockets.emit('seen', 'seen');
            });
        } catch (err) {
            console.log(err)
            useAlert("Socket error", "error");
        }

        return () => {
            console.log("try to disconnect, but deactivated rn");
            //socket.disconnect();
        };
    }, []);

    useEffect(() => {
        (async () => {
            try {
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
                if (number_of_messages > 0) {
                    setMyId(response.data[0].to)
                    setsidekickId(response.data[0].from)
                }


                for (let i = 0; i < number_of_messages; i++) {
                    const message = response.data[i];
                    console.log(message)
                    message.to === myID ? console.log("LEFT") : console.log("RIGHT")
                    messageElements.push(
                        <MessageBox
                            position={message.to === myID ? "left" : "right"}
                            type={"text"}
                            title={message.to === myID ? sidekick_name : "Moi"}
                            text={message.content}
                        />
                    );
                }
                setmessageElementsfull(messageElements);

            } catch (err: any) {
                if (err.response) {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useAlert(err.response.data.message, "error");
                } else {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useAlert(err.message, "error");
                }
            }
        })();
    }, []);

    async function sendMessage(message: string): Promise<void> {
        try {
            messages.push({
                content: "Bonjour Sidekick, comment vas tu ?",
                date: dayjs(),
                receverId: 1, // ???
                seen: true,
                senderId: 2, // ???
            });
            socket.emit('message', message);
        } catch (err: any) {
            if (err.response) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.response.data.message, "error");
            } else {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.message, "error");
            }
        }
    }

    async function sendUserIsWriting(): Promise<void> {
        try {
            socket.emit('writing', true);
        } catch (err: any) {
            if (err.response) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.response.data.message, "error");
            } else {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.message, "error");
            }
        }
    }

    async function sendUserIsNotWriting(): Promise<void> {
        try {
            socket.emit('writing', false);
        } catch (err: any) {
            if (err.response) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAlert(err.response.data.message, "error");
            } else {
                // eslint-disable-next-line react-hooks/rules-of-hooks
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
                        <div style={{ color: 'red' }}>Offline</div>
                    </div>

                    <div className="ktq4 text-center ">

                        {messageElementsfull}

                    </div>
                    <ChatForm sendMessage={sendMessage} />

                </div>
            </section >
        </div >
    );

}
