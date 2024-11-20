import { CareerProgressCondition, getCurrentCareer, getPreviousCareer, Policy, ProgressState, UserProgress } from './api'

//1. we need to check if the user is enrolled in the program by getting the userProgress data, and if the user has the id of the program, it means the user is enrolled in the program
//2. In order to validate if the user has access to the career, we need to check if the user has completed the previous career by getting the userProgress data and checking if for the current program, the last careerId has state completed.
//3. Third we need to check if the user has the permission to view the career by checking the policies.json file

export const checkPermission = (userData: UserProgress[], careerId: string, policy: Policy, programId: string): boolean => {
  const { conditions } = policy
  // Type guard to ensure we're handling the correct policy type
  if (conditions.type !== 'career_progress') {
    return false // or handle other policy types
  }

  const isUserEnrolledInProgram = userData.some((up) => up.programId === programId)
  const currentCareer = getCurrentCareer(careerId)
  if (!currentCareer) return false

  // Create validation payload for career progress
  const validationPayload: CareerProgressCondition = {
    type: 'career_progress',
    user_enrolled_in_program: isUserEnrolledInProgram,
    previous_career_approved: false // Default value
  }

  // First career (order 1) is accessible if user is enrolled
  if (currentCareer.order === 1) {
    return conditions.user_enrolled_in_program === validationPayload.user_enrolled_in_program
  }

  // For subsequent careers, check if previous career is completed
  const previousCareer = getPreviousCareer(careerId)
  if (!previousCareer) return false

  const isPreviousCareerCompleted = userData.some((up) => up.careerId === previousCareer.id && up.state === ProgressState.COMPLETED)

  validationPayload.previous_career_approved = isPreviousCareerCompleted

  // Exclude 'type' from the comparison because it doesn't has an use in the comparison
  const { type: conditionsType, ...conditionsToCheck } = conditions
  const { type: validationType, ...payloadToCheck } = validationPayload

  return Object.entries(conditionsToCheck).every(([key, value]) => payloadToCheck[key as keyof typeof payloadToCheck] === value)
}
