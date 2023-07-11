import { FC, SyntheticEvent, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'

type NavbarProps = { userName: string }

const Navbar: FC<NavbarProps> = (props): JSX.Element => {
  const { userName } = props

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const router = useRouter()

  const handleOnClickHome = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push('/my-list')
  }

  const handleShowDropdown = (e: SyntheticEvent): void => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="#" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image height={34} width={128} src="/static/netflix.svg" alt="logo" />
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li onClick={handleOnClickHome} className={styles.navItem}>
            Home
          </li>
          <li onClick={handleOnClickMyList} className={styles.navItem}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button onClick={handleShowDropdown} className={styles.usernameBtn}>
              <p className={styles.username}>{userName}</p>
              <Image height="24" width="24" src="/static/expand_more.svg" alt="expand more" />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" className={styles.linkName}>
                    Sign Out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
