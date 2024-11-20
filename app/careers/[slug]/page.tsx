import { Button } from '@/components/ui/button'
import { mockCareers, mockPrograms } from '@/utils/api'
import Link from 'next/link'
export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Find the program based on the slug
  const program = mockPrograms.find((p) => p.id === slug)

  // Find careers associated with the program
  const careers = mockCareers.filter((career) => career.programId === slug)

  if (!program) {
    return <div>Program not found</div> // Handle invalid program IDs
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen w-full'>
      <h1 className='text-3xl font-bold'>{program.name}</h1>
      <h2 className='text-2xl'>Careers:</h2>
      <div className='flex flex-row gap-4 h-[30%] w-full justify-center'>
        {careers.length > 0 ? (
          careers.map((career) => (
            <div key={career.id} className='flex flex-col gap-2 border-2 border-gray-300 rounded-md p-4 bg-white h-full'>
              <span className='flex-grow'>
                <h3 className='text-xl font-bold'>{career.name}</h3>
                <p>Order: {career.order}</p>
              </span>
              <span>
                <Link href={`/careers/${career.id}`}>
                  <Button>View Career</Button>
                </Link>
              </span>
            </div>
          ))
        ) : (
          <p>No careers found for this program.</p>
        )}
      </div>
    </div>
  )
}
