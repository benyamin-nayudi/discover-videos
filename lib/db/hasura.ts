import { MagicMetadata } from '../../types/types'
import {
  ManipulateStats,
  QueryHasuraGQL,
  StatsResponse,
  UserResponse,
} from './hasuraTypes'

export async function updateStats(
  token: string,
  { userId, videoId, favourited, watched }: ManipulateStats
) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
    update_stats(
        _set: {watched: $watched, favourited: $favourited}, 
        where: {
          userId: {_eq: $userId}, 
          videoId: {_eq: $videoId}
        }) {
      returning {
        id
        favourited
        userId
        videoId
        watched
      }
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'updateStats',
    { userId, videoId, favourited, watched },
    token
  )) as StatsResponse

  return res
}

export async function insertStats(
  token: string,
  { userId, videoId, favourited, watched }: ManipulateStats
) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $videoId: String!, $watched: Boolean!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched: $watched}) {
      watched
      videoId
      userId
      id
      favourited
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'insertStats',
    { userId, videoId, favourited, watched },
    token
  )) as StatsResponse

  return res
}

export async function isNewUser(token: string, issuer: string) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      issuer
      publicAddress
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    { issuer },
    token
  )) as UserResponse

  return res?.data?.users.length === 0
}

export async function createNewUser(token: string, metadata: MagicMetadata) {
  const { issuer, email, publicAddress } = metadata

  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'createNewUser',
    { issuer, email, publicAddress },
    token
  )) as UserResponse

  return res
}

export async function findVideoIdByUser(
  token: string,
  userId: string,
  videoId: string
) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      favourited
      userId
      videoId
      watched
      id
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'findVideoIdByUserId',
    { userId, videoId },
    token
  )) as StatsResponse

  return res?.data?.stats
}

export async function getWatchedVideos(userId: string, token: string) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, watched: {_eq: true}}) {
      videoId
    }
  }
`

  const res = (await queryHasuraGQL(
    operationsDoc,
    'watchedVideos',
    { userId },
    token
  )) as StatsResponse

  return res?.data?.stats
}

export async function getMyListVideos(userId: string, token: string) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      videoId
    }
  }
`;

  const res = (await queryHasuraGQL(
    operationsDoc,
    'favouritedVideos',
    { userId },
    token
  )) as StatsResponse

  return res?.data?.stats
}

export async function queryHasuraGQL(
  operationsDoc: string,
  operationName: string,
  variables: object,
  token: string
): Promise<QueryHasuraGQL> {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  })

  return await result.json()
}
