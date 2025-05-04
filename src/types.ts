export type VerificationStatus = 'pending' | 'verified' | 'rejected'

export type Domain = {
  id: string
  domain: string
  isActive: boolean
  status: VerificationStatus
  createdDate: number
}

export type DomainPayload = Omit<Domain, 'id'>

export type FetchBaseQueryError = {
  status: number | string
  data: unknown
}

export type SerializedError = {
  message?: string
  name?: string
  stack?: string
}
