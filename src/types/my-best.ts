export interface IMyBest {
  bestFrontendScore: number
  bestBackendScore: number
  bestMobdevScore: number
  frontendAchievedAt: string
  backendAchievedAt: string
  mobdevAchievedAt: string
}

export interface IMyBestResponse {
  data: IMyBest
}
