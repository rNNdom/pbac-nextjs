import React from 'react'
import { mockCareers, type Career } from '@/utils/api'

function Career({ programId }: { programId: string }) {
  const career = mockCareers.find((career) => career.id === programId)
  return (
    <div className='flex flex-col gap-4 border-2 border-gray-300 rounded-md p-4 bg-white'>
      <h1 className='text-2xl font-bold'>{career?.name}</h1>
    </div>
  )
}

export default Career
