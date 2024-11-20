enum ProgressState {
  NOT_STARTED = 'not_started',
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

export const user: User = {
  id: '1',
  name: 'John Doe'
}
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
    careerId: '1',
    programId: '1',
    state: ProgressState.IN_PROGRESS
  }
]
