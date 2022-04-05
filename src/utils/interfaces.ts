export interface Player {
  id: string,
  attributes: {
    name: string,
    rank: number,
    stats: {
      tier: string,
      subTier: string,
      rankPoints: number
    }
  }
}
