import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import magic from '../../lib/magic-client'
import styles from '../styles/Login.module.css'

type LoginProps = {}

const Login: FC<LoginProps> = (props): JSX.Element => {
  const [userMsg, setUserMsg] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleLoginWithEmail = async () => {
    if (email) {
      if (email === 'benyamin.naudi@gmail.com') {
        try {
          setIsLoading(true)
          const didToken = await magic?.auth.loginWithMagicLink({ email })
          if (didToken) {
            router.push('/')
          }
        } catch (error) {
          console.error('error', error)
          setIsLoading(false)
        }
      } else {
        setUserMsg('something went wrong logging in')
        setIsLoading(false)
      }
    } else {
      setUserMsg('Enter a valid email address')
    }
  }

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMsg('')
    const email = e.target.value
    setEmail(email)
  }

  const handleComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)
    
    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  } , [router])

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign-in</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
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
        </div>
      </header>

      <div className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email Address"
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>

          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Login
