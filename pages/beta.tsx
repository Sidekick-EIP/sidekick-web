import React, {useState} from 'react';
import Image from 'next/image';
import axios from "axios";
import {ref, set} from "firebase/database";
import database from "@/lib/firebase";
import {uuidv4} from "@firebase/util";

function writeBetaUser(email: string, firstname: string, lastname: string) {
    const nid = uuidv4();
    set(ref(database, 'beta-users/' + nid), {
        email: email,
        firstname: firstname,
        lastname: lastname,
    });
}

export default function Beta() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://api.sidekickapp.live/beta-users/', {
                email: email,
                firstname: firstName,
                lastname: lastName,
            });
            writeBetaUser(email, firstName, lastName);

            if (response.status === 201) {
                setIsSubmitted(true);
            }
        } catch (error: any) {
            console.error('Erreur lors de l’inscription :', error);
            // Gère d'autres erreurs ici, par exemple :
            alert("Erreur réseau ou serveur : " + error.response.data.message || error.message);
        }
    };

    return (
        !isSubmitted ? (
                <div
                    className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full h-full mt-32">
                    <div
                        className="flex flex-col space-y-5 justify-center items-center text-center py-8 px-4 sm:px-6 lg:px-8">
                        <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32}/>
                        <h1 className="text-2xl text-orange-950 sm:text-4xl">
                            Get notified when we launch
                        </h1>
                        <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
                        <span
                            className="bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent">Sidekick</span>
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-8 space-y-4">

                                <div>
                                    <label className="sr-only text-orange-950">First Name</label>
                                    <div className="relative">
                                        <input type="text"
                                               onChange={e => setFirstName(e.target.value)}
                                               value={firstName}
                                               className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                               placeholder="First Name"
                                               required/>
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
                                    <label className="sr-only text-orange-950">Last Name</label>
                                    <div className="relative">
                                        <input type="text"
                                               onChange={e => setLastName(e.target.value)}
                                               value={lastName}
                                               className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                               placeholder="Last name"
                                               required/>
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
                                    <label className="sr-only text-orange-950">Email address</label>
                                    <div className="relative">
                                        <input type="email"
                                               onChange={e => setEmail(e.target.value)}
                                               value={email}
                                               className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                                               placeholder="Email address"
                                               required/>
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
                                    <button type='submit' className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                                        <p style={{color: 'white'}}>Join the waitlist</p>
                                        <svg className="w-3 h-3 text-white" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path
                                                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>)
            :
            (
                <div
                    className="flex w-full h-full justify-center items-center z-[60] overflow-x-hidden overflow-y-auto">
                    <div
                        className="mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="relative flex flex-col shadow-lg rounded-xl bg-gray-800">
                            <div className="absolute top-2 right-2">
                                <button type="button" onClick={() => setIsSubmitted(false)}
                                        className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                            fill="currentColor"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="p-4 sm:p-10 text-center overflow-y-auto">
                                <span
                                    className="mb-4 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" viewBox="0 0 16 16">
                                        <path
                                            d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                                    </svg>
                                </span>
                                <h3 className="mb-2 text-xl font-bold text-gray-200">
                                    Your demand has been sent!
                                </h3>
                                <p className="text-gray-500">
                                    We will contact you as soon as possible.
                                </p>

                                <div className="mt-6 flex justify-center gap-x-4">
                                    <button type="button" onClick={() => setIsSubmitted(false)}
                                            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all text-sm bg-gray-800 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white focus:ring-offset-gray-800"
                                            data-hs-overlay="#hs-task-created-alert">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    );
};