import { FC, SyntheticEvent, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

import styles from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import magic from '../../lib/magic-client'
import cookie from 'cookie'

type NavbarProps = {}

const Navbar: FC<NavbarProps> = (): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

  const router = useRouter()

  const handleOnClickHome = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e: SyntheticEvent): void => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropdown = (e: SyntheticEvent): void => {
    setShowDropdown(!showDropdown)
  }

  const handleSignout = async (e: SyntheticEvent) => {
    try {
      const res = await magic?.user.logout()
      // cookie.
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const metaData = await magic?.user.getMetadata()
        if (metaData && metaData.email) {
          setUserName(metaData.email)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserMetadata()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="#" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              height={34}
              width={128}
              src="/static/netflix.svg"
              alt="logo"
            />
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
              <Image
                height="24"
                width="24"
                src="/static/expand_more.svg"
                alt="expand more"
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link
                    onClick={handleSignout}
                    href="/login"
                    className={styles.linkName}
                  >
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
