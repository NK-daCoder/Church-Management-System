export type Events<T> = T & {
  id: string
  programId?: string
  eventId?: string
  createdAt?: string
  updatedAt?: string
}
