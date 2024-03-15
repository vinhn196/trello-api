/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

//a79TWBaLe1I8Mc8v

const MONGODB_URI = 'mongodb+srv://vinhn96hn:a79TWBaLe1I8Mc8v@cluster0-vinhnguyendev.bgudedj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0-VinhNguyenDev'

const DATABASES_NAME = 'Trello-api'

import { MongoClient, ServerApiVersion } from 'mongodb'

//Khởi tạo một đối tượng trelloDatabase
let trelloDatabaseInstance = null


//Khởi tạo một đối tượng để kết nối với mongoDB
const mongoClientInstance = new MongoClient( MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Kết nối với database

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  trelloDatabaseInstance = mongoClientInstance.db(DATABASES_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}
