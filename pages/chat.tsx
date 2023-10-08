import {useEffect, useState} from "react";
import axios from "axios";
import {useSnackBar} from "@/components/SnackBar";
import io from 'socket.io-client';
import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import dayjs from "dayjs";

export default function Chat(): JSX.Element {
    const {data}: { data: Session | null } = useSession();
    const [messages, setMessages] = useState<any>(null);
    const [userIsWriting, setUserIsWriting] = useState<boolean>(false);
    const [socket, setSocket] = useState<any>(null);
    const useAlert: any = useSnackBar();

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
            socket.disconnect();
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

    return <div>
        {JSON.stringify(messages)}
    </div>

}