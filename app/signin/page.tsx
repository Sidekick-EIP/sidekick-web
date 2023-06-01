"use client";

import Image from 'next/image'
import ChatBot from 'react-simple-chatbot';
 
const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div>
    oui
    </div>
    <ChatBot steps={steps} floating={true} className={"bg-orange-200"} />
    </main>
  )
}
