export type Domain = {
  id: string
  domain: string
  isActive: boolean
  status: 'pending' | 'verified' | 'rejected'
  createdDate: number
}

export type DomainPayload = Omit<Domain, '_id'>

export type FetchBaseQueryError = {
  status: number | string
  data: unknown
}

export type SerializedError = {
  message?: string
  name?: string
  stack?: string
}
