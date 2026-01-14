export interface ILeaderboard {
  rank: number
  fullName: string
  frontendScore: number
  backendScore: number
  profilePicture: string
  totalScore: number
  lastAchievedAt: string
}

export interface ILeaderboardResponse {
  data: ILeaderboard[]
}
