export interface IMyBest {
  bestFrontendScore: number
  bestBackendScore: number
  frontendAchievedAt: string
  backendAchievedAt: string
}

export interface IMyBestResponse {
  data: IMyBest
}
