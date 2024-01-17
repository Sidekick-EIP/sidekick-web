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
    const [sidekick_name, setsidekickName] = useState("Julot");
    const [avatar, setAvatar] = useState("../Theo.png");
    const [myID, setMyId] = useState("1");
    const [sidekickId, setsidekickId] = useState("1");

    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        if (!data?.user.access_token) return;

        const fetchMessages = async () => {
            console.log(data?.user.access_token)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/all`, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            });
        }
        fetchMessages();

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
        };
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

    // async function sendUserIsWriting(): Promise<void> {
    //     try {
    //         socket.emit('writing', true);
    //     } catch (err: any) {
    //         if (err.response) {
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             useAlert(err.response.data.message, "error");
    //         } else {
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             useAlert(err.message, "error");
    //         }
    //     }
    // }

    // async function sendUserIsNotWriting(): Promise<void> {
    //     try {
    //         socket.emit('writing', false);
    //     } catch (err: any) {
    //         if (err.response) {
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             useAlert(err.response.data.message, "error");
    //         } else {
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             useAlert(err.message, "error");
    //         }
    //     }
    // }

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


                    <div className="ktq4 text-center flex items-center">

                        <Field >
                            <div className="pt-2 text-start flex flex-col max-w-5x">
                                <input
                                    placeholder="Enter your message..."
                                    className="py-3 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-2"
                                    required
                                />
                            </div>
                        </Field>
                        <div>
                            <Button type="submit" variant="contained" className="ml-4 h-14 flex bg-orangePrimary" onClick={() => sendMessage("test")}>
                                Send
                            </Button>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    );

}
