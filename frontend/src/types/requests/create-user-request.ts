export interface CreateUserRequest {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
  groups: number[] // Array of group IDs
}
