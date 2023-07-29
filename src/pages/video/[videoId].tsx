import { useRouter } from 'next/router'
import { FC } from 'react'
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'

import Modal from 'react-modal'
import clsx from 'classnames'

import Navbar from '../../../components/nav/navbar'

import styles from '../../styles/Video.module.css'
import { getYoutubeVideoById } from '../../../lib/videos'
import { ParsedUrlQuery } from 'querystring'

Modal.setAppElement('#__next')

interface Params extends ParsedUrlQuery {
  videoId: string
}

type VideoType = Awaited<ReturnType<typeof getYoutubeVideoById>>

export const getStaticProps: GetStaticProps<
  { video: VideoType },
  Params
> = async (context) => {
  const videoId = context.params?.videoId
  const videoArray = await getYoutubeVideoById(videoId!)
  // console.log(videoArray);

  return {
    props: {
      video: videoArray,
    },
    revalidate: 10
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfVideos = ['4zH5iYM4wJo', 'pBk4NYhWNMM', 'wS_qbDztgVY']
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

const Video = ({ video }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  const videoId = router.query.videoId

  const { title, publishTime, description, channelTitle, statistics } =
    video[0] || {}

  return (
    <>
      <div className={styles.container}>
      <Navbar />
        <Modal
          isOpen
          onRequestClose={() => router.back()}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <iframe
            className={styles.videoPlayer}
            id="ytplayer"
            data-type="text/html"
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=http://example.com`}
            data-frameborder="0"
          ></iframe>

          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{publishTime}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>

              <div className={styles.col2}>
                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>

                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>View Count: </span>
                  <span className={styles.channelTitle}>
                    {statistics.viewCount}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default Video
