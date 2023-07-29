import Link from 'next/link'
import { FC } from 'react'
import { CardSectionVideos } from '../../types/types'
import Card from './card'

import styles from './section-cards.module.css'

// interface ISectionCardVideos  { imgUrl: string }

export interface SectionCardProps {
  title: string
  size?: 'large' | 'medium' | 'small'
  videos: CardSectionVideos[]
}

const SectionCards: FC<SectionCardProps> = (props): JSX.Element => {
  const { title, videos = [], size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Link href={`/video/${video.id}`}>
              <Card id={index} imgUrl={video.imgUrl} size={size} key={index} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default SectionCards
