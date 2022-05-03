export interface User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  newsletter: boolean
}

export interface UserState {
  user?: User
}
