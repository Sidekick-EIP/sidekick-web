import {ConfirmationNumberOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import {useRouter} from 'next/router';
import React, {useState} from "react";
import axios from "axios";

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
        <div className='flex flex-row items-center justify-center w-[400px]'>
            <form className='flex flex-col space-y-4 w-full' onSubmit={handleSubmit}>
                <TextField fullWidth placeholder="123456" focused required
                           InputProps={{style: {fontStyle: 'italic', color: 'grey'},}} className="w-full" name='code'
                           label="Code" variant="outlined" value={code} onChange={e => setCode(e.target.value)}/>
                <TextField fullWidth placeholder="exemple@gmail.com" required
                           InputProps={{style: {fontStyle: 'italic', color: 'grey'},}} className="w-full" name='email'
                           label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField fullWidth placeholder="*******" required
                           InputProps={{style: {fontStyle: 'italic', color: 'grey'},}} className="w-full"
                           name='password' type='password' label="Password" variant="outlined" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                <TextField fullWidth placeholder="*******" required
                           InputProps={{style: {fontStyle: 'italic', color: 'grey'},}} className="w-full"
                           name='confirmPassword' type='password' label="confirmPassword" variant="outlined"
                           value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                <Button className="bg-orangePrimary" variant="contained" type='submit'>Reset Password</Button>
            </form>
        </div>
    );
}
