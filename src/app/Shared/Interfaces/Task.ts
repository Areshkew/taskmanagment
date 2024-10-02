import { Person } from "./Person"

export interface Task{
    taskName: string,
    deadline: Date,
    status: string,
    persons: Person[]
}