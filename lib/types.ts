export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected"

export interface JobApplication {
  _id?: string
  company: string
  role: string
  status: JobStatus
  appliedDate: string
  link: string
  createdAt?: string
  updatedAt?: string
}
