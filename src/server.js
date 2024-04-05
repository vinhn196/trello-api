import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import existHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))
  //Enable req.body json data
  app.use(express.json())

  //Uses API v1
  app.use('/v1', APIs_V1)

  //Middleware xử lý lỗi tập chung
  app.use(errorHandlingMiddleware)

  //Môi trường production (cụ thể là render.com)
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3. Production: Hello ${env.AUTHOR}, Back-end Server is running success at Port: ${process.env.PORT}`
      )
    })
  } else {
    //Môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `3. Local Dev: Hello ${env.AUTHOR}, Back-end Server is running success at Host: ${env.LOCAL_DEV_APP_HOST} and Port: ${env.LOCAL_DEV_APP_PORT}`
      )
    })
  }

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
    console.log('1. Connecting to MongoDB cloud Atlas ...')
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
