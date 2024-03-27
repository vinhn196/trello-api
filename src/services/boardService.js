import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import {cloneDeep} from 'lodash'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
      title: slugify(reqBody.title),
      columnOrderIds:['507f191e810c19729de860ea']
    }
    //Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //Trả về kết quả , trong Service luôn phải có return
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    // console.log(boardId)
    const board = await boardModel.getDetails(boardId)
    // console.log(board)
    if (!board) {
      throw new ApiError( StatusCodes.NOT_FOUND, 'board not found' )
    }
    //B1: Deep board ra 1 cái mới để xử lý, không ảnh hưởng tới board ban đầu
    const resBoard = cloneDeep(board)

    //B2: Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString() )
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id) )
    })

    //B3: Xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    return resBoard
    // return await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getDetails
}