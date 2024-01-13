import {ConfirmationNumberOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useRouter} from 'next/router';
import React, {useState} from "react";
import axios from "axios";
import {Key} from "react-feather";

async function resetPassword(email: string, password: string, confirmPassword: string, code: string) {
    if (password !== confirmPassword) {
        return false;
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, {
            email: email,
            password: password,
            verificationCode: code,
        })

        return true
    } catch (error) {
        console.log('Invalid code : ', error);
        return false
    }
}

export default function Planning() {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true)
        if (await resetPassword(email, password, confirmPassword, code)) {
            await router.push("/signin")
        }
        setIsLoading(false)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full mt-32 px-4 py-2'>
            <h1 className="text-2xl text-orange-950 sm:text-4xl">
                Fill your new password
            </h1>
            <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
                <span className="bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent">Reset password</span>
            </h2>

            <form className='flex flex-col items-center justify-center space-y-4 w-full sm:w-[400px] mt-2'
                  onSubmit={handleSubmit}>

                <div className="mt-2 text-start w-full">
                    <label className="text-sm text-orange-950">Code</label>
                    <input onChange={e => setCode(e.target.value)}
                           value={code}
                           className="py-3 ps-2 sm:ps-11 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4"
                           placeholder="123456"
                           required/>
                </div>

                <div className="pt-2 text-start w-full">
                    <label className="text-sm text-orange-950">Email address</label>
                    <div className="relative">
                        <input type="email"
                               onChange={e => setEmail(e.target.value)}
                               value={email}
                               className="py-3 ps-11 border border-orange-300 w-full text-orange-950 bg-white placeholder:text-orange-950 rounded-md text-sm sm:p-4 sm:ps-11"
                               placeholder="exemple@gmail.com"
                               required/>
                        <div
                            className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-2 sm:ps-4">
                            <svg className="h-4 w-4 text-orange-950" xmlns="http://www.w3.org/2000/svg"
                                 width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="pt-2 w-full">
                    <label className="text-orange-950 text-sm">Password</label>
                    <div className="relative">
                        <input type="password"
                               onChange={e => setPassword(e.target.value)}
                               value={password}
                               className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                               placeholder="******"
                               required/>
                        <div
                            className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-2 sm:ps-4">
                            <Key size={16} className="text-orange-950"/>
                        </div>
                    </div>
                </div>

                <div className="pt-2 w-full">
                    <label className="text-orange-950 text-sm">Confirm password</label>
                    <div className="relative">
                        <input type="password"
                               onChange={e => setConfirmPassword(e.target.value)}
                               value={confirmPassword}
                               className="py-3 ps-11 pe-4 border border-orange-300 w-full bg-white text-orange-950 placeholder:text-orange-950 rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                               placeholder="******"
                               required/>
                        <div
                            className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-2 sm:ps-4">
                            <Key size={16} className="text-orange-950"/>
                        </div>
                    </div>
                </div>


                <button type='submit'
                        className="flex flex-row justify-center w-full items-center bg-orangePrimary hover:underline text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                    {isLoading &&
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"/>
                        </svg>}
                    <p style={{ color: 'white' }}>Reset password</p>
                </button>
            </form>
        </div>
    );
}
