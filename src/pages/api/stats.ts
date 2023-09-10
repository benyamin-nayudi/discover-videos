import { NextApiResponse, NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from '../../../lib/db/hasura'
import { MagicMetadata } from '../../../types/types'
import { verifyToken } from '../../../lib/utils'

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token

    if (!token) {
      res.status(403).send({ msg: 'unauthorized' })
    } else {
      const { videoId } = req.method === 'POST' ? req.body : req.query
     

      const userId = await verifyToken(token)

      if (userId && videoId) {
        console.log(token);
        const findVideo = await findVideoIdByUser(token, userId, videoId)

        const doesStatsExist = findVideo?.length > 0
        
        if (req.method === 'POST') {
          const { favourited, watched = true } = req.body

          if (doesStatsExist) {
            // update it
            const response = await updateStats(token, {
              favourited,
              watched,
              userId,
              videoId,
            })

            res.send({ response })
          } else {
            // add it
            const response = await insertStats(token, {
              favourited,
              watched,
              userId,
              videoId,
            })
            res.send({ response })
          }
        } else {
          if (doesStatsExist) {
            res.send(findVideo)
          } else {
            res.status(404).send({ user: null, msg: 'video not found' })
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ done: false, error })
  }
}
