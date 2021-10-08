export interface Employee {
  uniqueId: number
  name: string
  subordinate: Employee[]
}

export const defaultEmployee: Employee = {
  uniqueId: 0,
  name: '',
  subordinate: [],
}
