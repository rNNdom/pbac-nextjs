import { Button } from '@/components/ui/button'
import { getUserProgressOnProgram, mockCareers, mockPrograms, Policy, ProgressState, UserProgress, users } from '@/utils/api'
import Link from 'next/link'
import policies from '@/utils/policies.json'
export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Find the program based on the slug
  const program = mockPrograms.find((p) => p.id === slug)
  // Find careers associated with the program
  const careers = mockCareers.filter((career) => career.programId === slug)
  if (!program) {
    return <div>Program not found</div> // Handle invalid program IDs
  }
  // Get the user progress on the program
  const userProgress = getUserProgressOnProgram(users[0].id, program.id)
  //1. we need to check if the user is enrolled in the program by getting the userProgress data, and if the user has the id of the program, it means the user is enrolled in the program
  //2. In order to validate if the user has access to the career, we need to check if the user has completed the previous career by getting the userProgress data and checking if for the current program, the last careerId has state completed.
  //3. Third we need to check if the user has the permission to view the career by checking the policies.json file

  const checkPermission = (userData: UserProgress[], careerId: string, policy: Policy) => {
    const { conditions } = policy
    const isUserEnrolledInProgram = userData.some((up) => up.programId === program.id)

    // Get current career order
    const currentCareer = careers.find((c) => c.id === careerId)
    if (!currentCareer) return false

    // First career (order 1) is accessible if user is enrolled
    if (currentCareer.order === 1) {
      return conditions['user_enrolled_in_program'] === isUserEnrolledInProgram
    }

    // For subsequent careers, check if previous career is completed
    const previousCareer = careers.find((c) => c.order === currentCareer.order - 1)
    if (!previousCareer) return false

    const isPreviousCareerCompleted = userData.some((up) => up.careerId === previousCareer.id && up.state === ProgressState.COMPLETED)

    return conditions['user_enrolled_in_program'] === isUserEnrolledInProgram && conditions['previous_career_approved'] === isPreviousCareerCompleted
  }

  const allowed = (careerId: string) => policies.policies.some((policy) => checkPermission(userProgress, careerId, policy))

  return (
    <div className='flex flex-col gap-4 justify-center items-center min-h-screen w-full'>
      <h1 className='text-3xl font-bold'>{program.name}</h1>
      <h2 className='text-2xl'>Careers:</h2>
      <div className='flex flex-row gap-4 h-[30%] w-full justify-center'>
        {careers.length > 0 ? (
          careers.map((career) =>
            allowed(career.id) ? (
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
            ) : (
              <div key={career.id}>
                <p>You do not have permission to view this career</p>
              </div>
            )
          )
        ) : (
          <p>No careers found for this program.</p>
        )}
      </div>
    </div>
  )
}
