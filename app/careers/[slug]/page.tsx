import { mockCareers, getUserProgressOnProgram, users, Policy } from '@/utils/api'
import { checkPermission } from '@/utils/utils'
import policies from '@/utils/policies.json'
import React from 'react'

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const career = mockCareers.find((c) => c.id === slug)
  if (!career) return <div>Career not found</div>
  const userProgress = getUserProgressOnProgram(users[1].id, career.programId)
  const allowed = checkPermission(userProgress, career.id, policies.policies[0] as Policy, career.programId)
  if (!allowed) return <div>You do not have permission to view this career</div>
  return <div>{career?.name}</div>
}

export default page
