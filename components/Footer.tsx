import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin } from 'react-feather'

export function Footer() {
  return (
    <div className="bg-[#F25D29] w-full">
        <div className="sm:flex sm:flex-row flex-col max-w-7xl sm:justify-between space-y-6 sm:space-y-0 items-center p-8 mx-auto">
            <div className='flex items-center justify-center'>
                <Link href="/">
                    <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32} />
                </Link>
                <p className="ml-7 text-white font-bold">Sidekick</p>
            </div>
            <div className='flex space-x-4 justify-center'>
                <Link href="https://www.linkedin.com/company/sidekick-eip/">
                    <Linkedin color='white'/>
                </Link>
                <Link href="https://www.instagram.com/sidekick_eip/">
                    <Instagram color='white'/>
                </Link>
            </div>
        </div>

    </div>
  )
}