import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { verifyToken } from '../lib/utils'

type ContextType = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>

const useRedirectUser = async (context: ContextType) => {
  const token = context.req ? context.req?.cookies.token : null
  if (token) {
    const userId = await verifyToken(token)
    return {
      userId,
      token,
    }
  }

  return {
    userId: "",
    token: "",
  }
}

export default useRedirectUser
