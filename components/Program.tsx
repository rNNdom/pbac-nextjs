import React from 'react'
import { type Program } from '@/utils/api'
import Link from 'next/link'

function Program({ program }: { program: Program }) {
  return (
    <div className='flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4 bg-white'>
      <h1 className='text-2xl font-bold'>{program?.name}</h1>
      <Link href={`/careers/${program.id}`}>
        <p className='text-blue-500 hover:underline'>View Careers</p>
      </Link>
    </div>
  )
}

export default Program
