import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Key } from 'react-feather';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn('signin', {
      email,
      password,
    });
  }

  return (
    <div
      className="relative max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full h-full">
      <div className="flex flex-col space-y-5 justify-center items-center text-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl text-white sm:text-4xl">
          Fill your credentials an
        </h1>
        <h2 className="mt-1 sm:mt-3 text-4xl font-bold text-white sm:text-6xl">
          <span
            className="bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-transparent">LogIn</span>
        </h2>


        <div className='flex items-center justify-center'>
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            {/* <TextField placeholder="exemple@gmail.com" focused color="white" InputProps={{ style: { fontStyle: 'italic', color: 'grey' }, }} className="w-full" name='email' label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} /> */}
            <div className="pt-5">
              <label className="sr-only">Email address</label>
              <div className="relative">
                <input type="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  className="py-3 ps-11 pe-4 block w-full bg-white/[.03] border-white/20 text-white placeholder:text-white rounded-md text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                  placeholder="exemple@gmail.com"
                  required />
                <div
                  className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
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
                  required />
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-4">
                <Key size={16} color="white" />
                </div>
              </div>
            </div>
            
            {/* <TextField placeholder="******" focused color="white" InputProps={{ style: { fontStyle: 'italic', color: 'grey' }, }} className="w-full" name='password' type='password' label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} /> */}
            <Button className="bg-orangePrimary" variant="contained" type='submit'>Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    console.log(session);
    return { redirect: { destination: "/" } };
  }

  return {
    props: {}
  }
}

export default Signin