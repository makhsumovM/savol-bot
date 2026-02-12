export interface ILeaderboard {
  rank: number
  fullName: string
  frontendScore: number
  backendScore: number
  profilePicture: string
  totalScore: number
  lastAchievedAt: string
  mobdevScore: number
}

export interface ILeaderboardResponse {
  data: ILeaderboard[]
}
