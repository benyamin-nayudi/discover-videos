export interface ManipulateStats {
  userId: string
  videoId: string
  favourited: number
  watched: boolean
}

type StatsTableProperties = {
  videoId: string
  watched: boolean
  userId: string
  favourited: 0 | 1 | 2
  id: number
}

export type StatsResponse = {
  data: {
    stats: StatsTableProperties[]
  }
}

type UserTableProperties = {
  issuer: string
  publicAddress: string
  email: string
  id: number
}
export type UserResponse = {
  data: {
    users: UserTableProperties[]
  }
}

export type QueryHasuraGQL = UserResponse | StatsResponse
