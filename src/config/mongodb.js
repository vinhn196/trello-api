/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'

//Khởi tạo một đối tượng trelloDatabase
let trelloDatabaseInstance = null


//Khởi tạo một đối tượng để kết nối với mongoDB
const mongoClientInstance = new MongoClient( env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Kết nối với database

export const CONNECT_DB = async () => {
  console.log(process.env.DATABASE_NAME)

  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASES_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

export const CLOSE_DB = () => {
  console.log('Exit app')
}