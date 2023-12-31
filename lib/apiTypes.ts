interface Thumbnail {
  url: string
  width: number
  height: number
}

interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
  }
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

interface ItemId {
  kind: string
  videoId: string
  channelId: string
}

interface Statistics {
  viewCount: number
}

interface Item {
  kind: string
  etag: string
  id: ItemId
  statistics?: Statistics
  snippet: Snippet
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface Error {
  message: string
  domain: string
  reason: string
}

export interface SuccessApiCall {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: Item[]
}

export interface FailedApiCall {
  error: {
    code: string
    message: string
    error: Error[]
    status: string
  }
}
