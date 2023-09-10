import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { FC } from 'react'
import SectionCards from '../../../components/card/section-cards'
import Navbar from '../../../components/nav/navbar'
import { getMyList } from '../../../lib/videos'
import { CardSectionVideos } from '../../../types/types'
import useRedirectUser from '../../../utils/redirectUser'

import styles from '../../styles/MyList.module.css'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, token } = await useRedirectUser(context)

  let videos

  if (userId && token) {
    videos = await getMyList(userId, token)
  }

  return {
    props: { myListVideos: videos || [] },
  }
}

type MyListProps = {
  myListVideos: CardSectionVideos[]
}

const MyList: FC<MyListProps> = ({ myListVideos }): JSX.Element => {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>

      <main className={styles.main}>
        <Navbar />

        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="medium"
            shouldWrap
          />
        </div>
      </main>
    </div>
  )
}

export default MyList
