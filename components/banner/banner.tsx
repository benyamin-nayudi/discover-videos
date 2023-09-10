import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styles from './banner.module.css'

type BannerProps = {
  title: string
  subTitle: string
  imgUrl: string
  videoId: string
}

const Banner: FC<BannerProps> = (props): JSX.Element => {
  const router = useRouter()

  const { title, videoId, subTitle, imgUrl } = props

  const handleOnPlay = (): void => {
    router.push(`video/${videoId}`)
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firtLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/play_arrow.svg"
                alt="play icon"
                width={32}
                height={32}
              />
              <span className={styles.playText}>play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
      ></div>
    </div>
  )
}

export default Banner
