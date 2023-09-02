import { CardSectionVideos } from '../types/types'
import { FailedApiCall, SuccessApiCall } from './apiTypes'
import videoTestData from '../data/videos.json'

const fetchVideos = async (url: string) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const BASE_URL = 'youtube.googleapis.com/youtube/v3'
  const apiUrl = `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`

  const response = await fetch(apiUrl)
  const data = (await response.json()) as SuccessApiCall | FailedApiCall
  return data
}

export const getCommonVideos = async (url: string) => {
  try {
    const isDev = process.env.DEVELOPMENT 
    // console.log('=========', isDev)
    const data = isDev
      ? (videoTestData as unknown as SuccessApiCall)
      : await fetchVideos(url)

      // console.log('data', data);
    if ('error' in data) {
      console.log('youtube api error', data.error)
      return []
    }
    console.log('isDev',isDev);



    return data.items.map((item) => {
      // console.log('item', item);
      const snippet = item.snippet

      return {
        id: item.id?.videoId || item.id.channelId || item.etag,
        imgUrl: snippet.thumbnails.high.url,
        title: snippet.title,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      }
    })
  } catch (error) {
    console.error('something went wrong with video lib', error)
    return []
  }
}

export const getVideos = async (
  searchQuery: string
): Promise<CardSectionVideos[]> => {
  const url = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video`
  return getCommonVideos(url)
}

export const getPopularVideos = () => {
  const URL =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'
  return getCommonVideos(URL)
}

export const getYoutubeVideoById = (id: string) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`
  return getCommonVideos(URL)
}
