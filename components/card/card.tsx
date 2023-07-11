import Image from 'next/image'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import cls from 'classnames'

import styles from './card.module.css'

type CardProps = {
  imgUrl: string
  size?: 'large' | 'medium' | 'small'
  id: number | string
}

const defaultImg =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'

const Card: FC<CardProps> = (props): JSX.Element => {
  const { imgUrl = defaultImg, size = 'medium', id } = props

  const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }

  const handleOnError = (): void => {
    setImgSrc(defaultImg)
  }

  const scale = id === 0 ? {scaleY : 1.1} : {scale: 1.1}

  return (
    <div className={styles.container}>
      <motion.div whileHover={{ ...scale }} className={cls(classMap[size], styles.imgMotionWrapper)}>
        <Image
          onError={handleOnError}
          src={imgSrc}
          alt="image"
          layout="fill"
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  )
}

export default Card
