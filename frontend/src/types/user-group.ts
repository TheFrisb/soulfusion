import { UserGroupDescription } from './user-group-description.ts'

export interface UserGroup {
  id: number
  name: string
  description: UserGroupDescription
}

// Helper to get the description string from a UserGroup
export function getGroupDescription(group: UserGroup): string {
  return group.description?.description || ''
}

// Helper to convert camelCase or PascalCase to Sentence case with spaces
export function camelToSentenceCase(str: string): string {
  if (!str) return ''
  // Insert a space before all caps and capitalize the first letter
  const spaced = str.replace(/([a-z])([A-Z])/g, '$1 $2')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}
