import { UserGroup } from '@/types/user-group.ts'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  date_joined: Date
  groups: UserGroup[]
}
