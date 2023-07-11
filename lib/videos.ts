import videoData from '../data/videos.json'
import { ICardSectionVideos } from '../types'

interface IVideoObject {
  kind: string
  etag: string
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      high: {
        url: string
        width: number
        height: number
      }
    }
    channelTitle: string
    liveBroadcastContent: string
    publishTime: string
  }
}

interface IVideoList {
  items: IVideoObject[]
}

const videos: IVideoList = videoData

export const getVideos = (): ICardSectionVideos[] => {
  return videos.items.map((item) => {
    return {
      id: item?.id?.videoId,
      imgUrl: item?.snippet?.thumbnails?.high?.url,
      title: item?.snippet?.title,
    }
  })
}
