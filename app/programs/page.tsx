import Program from '@/components/Program'
import { mockPrograms, user } from '@/utils/api'

export default function Home() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen w-full'>
      <h1>Hello {user.name}</h1>
      <h2>Programs:</h2>

      <div className='flex flex-row gap-4 '>
        {mockPrograms.map((program) => (
          <Program key={program.id} program={program} />
        ))}
      </div>
    </div>
  )
}