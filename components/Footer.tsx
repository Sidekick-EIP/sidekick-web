import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin } from 'react-feather'

export function Footer() {
  return (
    <div className="bg-transparent sm:flex sm:flex-row flex-col sm:justify-between space-y-6 sm:space-y-0 items-center p-8 max-w-5xl mx-auto w-full">
      <div className='flex justify-center'>
        <Link href="/">
          <Image src="/logo_transparent.png" alt="Sidekick" width={32} height={32} />
        </Link>
      </div>
      <div className='flex space-x-4 justify-center'>
        <Link href="https://www.linkedin.com/company/sidekick-eip/">
          <Linkedin />
        </Link>
        <Link href="https://www.instagram.com/sidekick_eip/">
          <Instagram />
        </Link>
      </div>
    </div>
  )
}