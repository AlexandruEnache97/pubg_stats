export interface Player {
  id: string,
  type: string,
  attributes: {
    name: string,
    rank: number,
    stats: {
      averageDamage: number,
      averageRank: number,
      games: number,
      kda: number,
      killDeathRatio: number,
      kills: number,
      winRatio: number,
      wins: number,
      tier: string,
      subTier: string,
      rankPoints: number
    }
  }
}

export interface LeaderboardCollectedData {
  averageDamage: number,
  averageRank: number,
  games: number,
  kda: number,
  killDeathRatio: number,
  kills: number,
  winRatio: number,
  wins: number,
  rankPoints: number,
  topNumberOfPlayers: number
}

export interface LeaderboardContextAPI {
  regionPlatform: string,
  platform: string,
  leaderboardDataCollected: LeaderboardCollectedData | null
}
