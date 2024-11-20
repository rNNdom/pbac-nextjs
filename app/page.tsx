import { user } from '@/utils/api'

export default function Home() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen w-full'>
      <h1>Hello {user.name}</h1>
      <h2>This is test to implement PBAC - policy based access control</h2>
    </div>
  )
}
