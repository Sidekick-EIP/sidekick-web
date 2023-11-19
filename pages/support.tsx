import {Session} from "next-auth";
import {useSession} from "next-auth/react";
import {useSnackBar} from "@/components/SnackBar";
import {useState} from "react";

export default function Support() {
    const {data}: { data: Session | null } = useSession();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const useAlert: any = useSnackBar();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setMessage("");
            setSubject("");
            setIsSuccess(true);
            useAlert("Message envoyé avec succès", "success");
        } catch (error: any) {
            useAlert("Erreur réseau ou serveur : " + error.response.data.message || error.message, "error");
        }
    };

    return <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mt-32">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-orange-950">Contact
            Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-orange-400 sm:text-xl">Got a technical
            issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="subject"
                       className="block mb-2 text-sm font-medium text-orange-300">Subject</label>
                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)}
                       className="block p-3 w-full text-sm rounded-lg border shadow-sm bg-white border-orange-600 placeholder-orange-950 text-orange-950 focus:ring-orange-500 focus:border-orange-500 shadow-sm-light"
                       placeholder="Let us know how we can help you" required/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-400">Your
                    message</label>
                <textarea id="message" rows={9} value={message} onChange={e => setMessage(e.target.value)}
                          className="block p-3 w-full text-sm rounded-lg border shadow-sm bg-white border-orange-600 placeholder-orange-950 text-orange-950 focus:ring-orange-500 focus:border-orange-500 shadow-sm-light"
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
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-700 sm:w-fit hover:bg-primary-800 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Send
                message
            </button>
        </form>
    </div>
};