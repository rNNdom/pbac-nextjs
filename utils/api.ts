export enum ProgressState {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
export interface User {
  id: string
  name: string
}
export interface Program {
  id: string
  name: string
}
export interface UserProgress {
  id: string
  userId: string
  careerId: string
  programId: string
  state: ProgressState
}
export interface Career {
  id: string
  programId: string
  name: string
  order: number
}
export interface Policy {
  name: string
  conditions: {
    [key: string]: boolean
  }
  actions: string[]
  resources: string[]
  description: string
}

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe'
  },
  {
    id: '2',
    name: 'Jane Doe'
  }
]
export const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Power Bi'
  },
  {
    id: '2',
    name: 'Colibra'
  }
]

export const mockCareers: Career[] = [
  {
    id: '1',
    programId: '1',
    name: 'Data Explorer',
    order: 1
  },
  {
    id: '2',
    programId: '1',
    name: 'Data Specialist',
    order: 2
  },
  {
    id: '3',
    programId: '2',
    name: 'Carrera 1',
    order: 1
  },
  {
    id: '4',
    programId: '2',
    name: 'Carrera 2',
    order: 2
  },
  {
    id: '5',
    programId: '1',
    name: 'Data Expert',
    order: 3
  },
  {
    id: '6',
    programId: '1',
    name: 'Data Champion',
    order: 4
  }
]
export const userProgress: UserProgress[] = [
  {
    id: '1',
    userId: '1',
    careerId: '1', // data explorer
    programId: '1',
    state: ProgressState.COMPLETED
  },
  {
    id: '2',
    userId: '1',
    careerId: '2', // data specialist
    programId: '1',
    state: ProgressState.COMPLETED
  },
  {
    id: '3',
    userId: '2',
    careerId: '1', // carrera 1
    programId: '2',
    state: ProgressState.COMPLETED
  },
  {
    id: '4',
    userId: '1',
    careerId: '5', // data expert
    programId: '1',
    state: ProgressState.IN_PROGRESS
  }
]

export const getUserProgressOnProgram = (userId: string, programId: string): UserProgress[] => {
  return userProgress.filter((up) => up.userId === userId && up.programId === programId)
}
