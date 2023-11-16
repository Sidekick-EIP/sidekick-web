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
        /* const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, JSON.stringify({
            email: email,
            password: password,
            verificationCode: code,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }); */
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
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (await resetPassword(email, password, confirmPassword, code) === true) {
            router.push("/signin")
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h1 className="text-2xl text-white sm:text-4xl">
                Fill your new password
            </h1>
            <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
          <span
              className="bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent">Reset password</span>
            </h2>
            <form className='flex flex-col items-center justify-center space-y-4 w-[400px] mt-2' onSubmit={handleSubmit}>
                <div className="pt-5">
                    <label className="sr-only">Code</label>
                    <div className="relative">
                        <input
                            onChange={e => setCode(e.target.value)}
                            value={code}
                            className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                            placeholder="123456"
                            required/>
                    </div>
                </div>
                <div className="pt-5">
                    <label className="sr-only">Email address</label>
                    <div className="relative">
                        <input type="email"
                               onChange={e => setEmail(e.target.value)}
                               value={email}
                               className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                               placeholder="exemple@gmail.com"
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
                <div className="pt-5">
                    <label className="sr-only">Password</label>
                    <div className="relative">
                        <input type="password"
                               onChange={e => setPassword(e.target.value)}
                               value={password}
                               className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                               placeholder="******"
                               required/>
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                            <Key size={16} color="white"/>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <label className="sr-only">Confirm password</label>
                    <div className="relative">
                        <input type='password' onChange={e => setConfirmPassword(e.target.value)}
                               value={confirmPassword}
                               className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                               placeholder="*****"
                               required/>
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                            <Key size={16} color="white"/>
                        </div>
                    </div>
                </div>


                <Button className="bg-orangePrimary" variant="contained" type='submit'>Reset Password</Button>
            </form>
        </div>
    );
}
