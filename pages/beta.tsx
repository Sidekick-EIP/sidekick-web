import {useState, FC} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import axios from "axios";

export default function Beta() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/beta-users', { firstName, lastName, email });

            if (response.status === 200) {
                router.push('/confirmation');
            } else {
                // Gère les erreurs venant de la réponse de l'API, par exemple :
                alert("Erreur lors de l'inscription : " + response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de l’inscription :', error);
            // Gère d'autres erreurs ici, par exemple :
            alert("Erreur réseau ou serveur : " + error.message);
        }
    };

    return (
        <div
            className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full h-full before:absolute before:top-0 before:left-1/2 before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2">
            <div className="flex flex-col space-y-5 justify-center items-center text-center py-8 px-4 sm:px-6 lg:px-8">
                <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32}/>
                <h1 className="text-2xl text-white sm:text-4xl">
                    Get notified when we launch
                </h1>
                <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
                    <span
                        className="bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent">Sidekick</span>
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mt-8 space-y-4">

                        <div>
                            <label className="sr-only">First Name</label>
                            <div className="relative">
                                <input type="text"
                                       onChange={e => setFirstName(e.target.value)}
                                       value={firstName}
                                       className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                       placeholder="First Name"/>
                                <div
                                    className="absolute inset-y-0 text-gray-400 text-gray left-0 flex items-center pointer-events-none z-20 ps-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Last Name</label>
                            <div className="relative">
                                <input type="text"
                                       onChange={e => setLastName(e.target.value)}
                                       value={lastName}
                                       className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                       placeholder="Last name"/>
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="sr-only">Email address</label>
                            <div className="relative">
                                <input type="email"
                                       onChange={e => setEmail(e.target.value)}
                                       value={email}
                                       className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                       placeholder="Email address"/>
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                         width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid">
                            <button type="submit"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-white/10 border border-transparent font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm sm:p-4">
                                Join the waitlist
                                <svg className="w-3 h-3" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};