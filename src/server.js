/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * 'A bit of fragrance clings to the hand that gives flowers!'
 */

import express from 'express'
import existHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    // console.log(await GET_DB().listCollections().toArray())
    // process.exit(0)
    console.log(env.DATABASE_NAME)
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello ${env.AUTHOR}, Back-end Server is running success at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`
    )
  })
  existHook(() => {
    console.log('4. Sever is shutting down ... ')
    CLOSE_DB()
    console.log('5. Disconected')
  })
}

//Chỉ kết nối tới database thành công thì mới start server back-end
// IIFE
(async () => {
  try {
    console.log('1. Connecting   to MongoDB cloud Atlas ...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB cloud Atlas')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

//Chỉ kết nối tới database thành công thì mới start server back-end
// console.log('1. Connecting to MongoDB cloud Atlas ...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB cloud Atlas'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
