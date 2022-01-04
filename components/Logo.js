import Link from 'next/link'
import BLOG from '@/blog.config'
import React from 'react'

const Logo = () => {
  return <Link href='/' passHref>
        <div className='flex flex-col justify-center items-center cursor-pointer bg-gray-800 space-y-3 h-32 font-bold mb-4'>
          <div className='font-serif text-xl text-white'> {BLOG.title}</div>
          <div className='text-sm text-gray-300 font-light'> {BLOG.description}</div>
        </div>
  </Link>
}
export default Logo
