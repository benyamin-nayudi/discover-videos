import { NextApiRequest, NextApiResponse } from 'next'
import { magicAdmin } from '../../../lib/magic'
import jwt from 'jsonwebtoken'
import { isNewUser, createNewUser } from '../../../lib/db/hasura'
import { setTokenCookie } from '../../../lib/cookies'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    try {
      const auth = req.headers.authorization
      const didToken = auth ? auth.substring(7) : ''

      const metadata = await magicAdmin.users.getMetadataByToken(didToken)
      const { issuer, email, publicAddress } = metadata

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user', 'admin'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET!
      )

      const isNewUserQuery = await isNewUser(token, metadata.issuer!)

      if (isNewUserQuery && email && issuer && publicAddress) {
        await createNewUser(token, {
          issuer,
          email,
          publicAddress,
        })
      }

      setTokenCookie(token, res)

      res.send({ done: true })
    } catch (error) {
      console.log(error)
      res.status(500).send({ done: false })
    }
  } else {
    res.send({ done: false })
  }
}
