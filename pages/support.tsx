import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {useSnackBar} from "@/components/SnackBar";
import {useState} from "react";

export default function Beta() {
    const {data}: { data: Session | null } = useSession();
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const useAlert: any = useSnackBar();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setMessage("");
            setSubject("");
            setEmail("");
            setIsSuccess(true);
            useAlert("Message envoyé avec succès", "success");
        } catch (error: any) {
            useAlert("Erreur réseau ou serveur : " + error.response.data.message || error.message, "error");
        }
    };

    return <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact
            Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">Got a technical
            issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Your
                    email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
                       className="shadow-sm border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                       placeholder="name@flowbite.com" required/>
            </div>
            <div>
                <label htmlFor="subject"
                       className="block mb-2 text-sm font-medium text-gray-300">Subject</label>
                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)}
                       className="block p-3 w-full text-sm rounded-lg border shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500 shadow-sm-light"
                       placeholder="Let us know how we can help you" required/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400">Your
                    message</label>
                <textarea id="message" rows={9} value={message} onChange={e => setMessage(e.target.value)}
                          className="block p-2.5 w-full text-sm rounded-lg shadow-sm border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Leave a comment..."></textarea>
            </div>
            {isSuccess && <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert">
                <span className="font-medium">
                    Tikcet sent successfully
                </span> You will receive a response within 24 hours.
            </div>}
            <button type="submit"
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Send
                message
            </button>
        </form>
    </div>
};