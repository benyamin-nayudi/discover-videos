import { jwtVerify, JWTVerifyResult } from 'jose'

export async function verifyToken(token: string) {
  try {
    if (token) {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
      verified.payload
      return verified.payload && verified.payload?.issuer as string
    }

    return null
  } catch (err) {
    console.error({ err })
    return null
  }
}
