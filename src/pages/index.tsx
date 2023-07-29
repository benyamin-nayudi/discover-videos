import Head from 'next/head'
import { Inter } from 'next/font/google'
import Banner from '../../components/banner/banner'
import Navbar from '../../components/nav/navbar'
import SectionCards from '../../components/card/section-cards'
import magic from '../../lib/magic-client'

import { getPopularVideos, getVideos } from '../../lib/videos'

import styles from '../styles/Home.module.css'
import { CardSectionVideos } from '../../types/types'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailers')

  const productivityVideos = await getVideos('productivity')

  const travelVideos = await getVideos('travel')

  const popularVideos = await getPopularVideos()

  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  }
}

interface IHomeProps {
  disneyVideos: CardSectionVideos[]
  productivityVideos: CardSectionVideos[]
  travelVideos: CardSectionVideos[]
  popularVideos: CardSectionVideos[]
}

export default function Home({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}: IHomeProps): JSX.Element {
  // console.log(magic);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="4zH5iYM4wJo"
          imgUrl="/static/clifford.webp"
          subTitle="very cute dog"
          title="clifford the big dog"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title="Travel" videos={travelVideos} size="small" />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
        </div>

        <SectionCards title="Popular" videos={popularVideos} size="small" />
      </div>
    </>
  )
}
