import videoData from '../data/videos.json'
import { ICardSectionVideos } from '../types'

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

interface VideoId {
  kind: string
  videoId: string
}

interface Item {
  kind: string
  etag: string
  id: VideoId
  snippet: Snippet
}

interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

interface ResponseData {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: Item[]
}

export const getVideos = async (): Promise<ICardSectionVideos[]> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${YOUTUBE_API_KEY}`

  const response = await fetch(url)

  const data: ResponseData = await response.json()

  return data.items.map((item) => {
    return {
      id: item.id.videoId,
      imgUrl: item.snippet.thumbnails.high.url,
      title: item.snippet.title,
    }
  })
}
