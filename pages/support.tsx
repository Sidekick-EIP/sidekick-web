import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {useSnackBar} from "@/components/SnackBar";
import React, {useState} from "react";
import axios from "axios";

export default function Support() {
    const {data}: { data: Session | null } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const useAlert: any = useSnackBar();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, {
                title: subject,
                content: message
            }, {
                headers: {
                    Authorization: `Bearer ${data?.user.access_token}`
                }
            })
            setIsLoading(false);
            setMessage("");
            setSubject("");
            setIsSuccess(true);
            useAlert("Message envoyé avec succès", "success");
        } catch (error: any) {
            useAlert("Erreur réseau ou serveur : " + error.response.data.message || error.message, "error");
        }
    };

    return <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-32">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-orange-950">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-orange-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-orange-300">Subject</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="block p-3 w-full text-sm rounded-lg border shadow-sm bg-white border-orange-600 placeholder-orange-950 text-orange-950 focus:ring-orange-500 focus:border-orange-500 shadow-sm-light"
                    placeholder="Let us know how we can help you"
                    required
                />
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400">Your message</label>
                <textarea
                    id="message"
                    rows={9}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block p-3 w-full text-sm rounded-lg border shadow-sm bg-white border-orange-600 placeholder-orange-950 text-orange-950 focus:ring-orange-500 focus:border-orange-500 shadow-sm-light"
                    placeholder="Leave a comment..."
                ></textarea>
            </div>
            {isSuccess && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">Ticket sent successfully</span> You will receive a response within 24 hours.
                </div>
            )}
            <button
                type="submit"
                className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
                {isLoading && (
                    <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                )}
                <p style={{ color: 'white' }}>Send message</p>
            </button>
        </form>
    </div>

};