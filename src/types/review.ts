export interface ICreateReview {
  text: string
  rating: number
}
export interface IReview {
  id: number
  userId: string
  userFullName: string
  userProfilePicture: string
  text: string
  rating: number
  isApproved: boolean
  createdAt: string
}

export interface IReviewResponse {
  data: IReview[]
}
