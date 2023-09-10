import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import magic from '../../lib/magic-client'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleComplete = () => {
    setIsLoading(false)
  }


  useEffect(() => {
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return isLoading ? <div>loading...</div> : <Component {...pageProps} />
}
