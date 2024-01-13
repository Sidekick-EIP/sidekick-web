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
    const [socket, setSocket] = useState<any>(null);
    const useAlert: any = useSnackBar();
    const [messageElementsfull, setmessageElementsfull] = useState([]);
    var messageElements = [];

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messages/getMessages`, {
                    headers: {
                        Authorization: `Bearer ${data?.user.access_token}`
                    }
                });
                console.log(response.data);
                setMessages(response.data);
                for (let i = 0; i < response.data.messages.length; i++) {
                    const message = response.data.messages[i];
                    console.log(message)
                    messageElements.push(
                        <MessageBox
                            position={message.senderId === 1 ? "left" : "right"}
                            type={"text"}
                            title={message.senderId === 1 ? "Jules" : "Moi"}
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

        setSocket(io("https://api.sidekickapp.live", {
            auth: {
                token: data?.user.access_token
            }
        }))

        try {
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
                socket.emit('seen', 'seen');
            });
        } catch (err) {
            useAlert("Socket error", "error");
        }

        return () => {
            console.log("try to disconect, but deactivated rn");
            //socket.disconnect();
        };
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


    function ChatForm() {
        const [messageInput, setMessageInput] = useState('');

        const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setMessageInput(e.target.value);
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            sendMessage(messageInput);
            setMessageInput('');
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={messageInput}
                    onChange={handleMessageChange}
                    placeholder='Type your message...'
                />
                <button type='submit'>Send</button>
            </form>
        );
    }


    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="pt-12 max-w-5xl mx-auto md:px-1 px-3">
                    <div className="ktqChat text-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <img src="../Theo.png" alt="Photo de profil" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                        </div>
                        <div>Jules</div>
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
                            <Button type="submit" variant="contained" className="ml-4 h-14 flex bg-orangePrimary">
                                Send
                            </Button>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    );

}