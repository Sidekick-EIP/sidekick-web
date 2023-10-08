import {useEffect, useState} from "react";
import axios from "axios";
import {useSnackBar} from "@/components/SnackBar";
import io from 'socket.io-client';
import {Session} from "next-auth";
import {useSession} from "next-auth/react";

export default function Chat(): JSX.Element {
    const {data}: { data: Session | null } = useSession();
    const [messages, setMessages] = useState<any>(null);
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

        const socket = io("https://api.sidekickapp.live", {
            // socket = io("http://localhost:8080", {
            auth: {
                token: data?.user.access_token
            }
        });

        try {
            socket.on('message', (data) => {
                console.log('Message received: ' + data);
            });

            socket.on('writing', (data) => {
                console.log('Writing received: ' + data);
            });

            socket.on('seen', (data) => {
                console.log('Seen received: ' + data);
            });

            socket.on('match', (data) => {
                console.log('Match received: ' + data);
            });

            socket.on('reconnect', (data) => {
                console.log('Match received: ' + data);
            });


            socket.on('connect', () => {
                console.log('Connecté au serveur Socket.IO');
            });
        } catch (err) {
            useAlert("Socket error", "error");
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    return <div>
        {JSON.stringify(messages)}
    </div>

}