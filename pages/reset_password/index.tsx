import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";

async function resetPassword(email: string, password: string, confirmPassword: string, code: string) {
	if (password !== confirmPassword) {
	  return false;
	}

	try {
	  var requestOptions = {
		method: 'POST',
		headers: { "Content-Type": 'application/json' },
		body: JSON.stringify({
		  email: email,
		  password: password,
		  verificationCode: code,
		})
	  };

	  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/resetPassword/", requestOptions)
		.then(response => {
			return true;
		})
		.catch(error => {
		  console.log('Error: ', error);
		});
	}
	catch (error) {
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
		<div className='flex items-center justify-center'>
			<form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
				<TextField placeholder="123456" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='code' label="Code" variant="outlined" value={code} onChange={e => setCode(e.target.value)} />
				<TextField placeholder="exemple@gmail.com" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='email' label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
				<TextField placeholder="*******" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='password' type='password' label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
				<TextField placeholder="*******" focused color="white" InputProps={{  style: { fontStyle:'italic', color: 'grey'},}} className="w-full" name='confirmPassword' type='password' label="confirmPassword" variant="outlined" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
				<Button className="bg-orangePrimary" variant="contained" type='submit'>Reset Password</Button>
			</form>
		</div>
	);
}
