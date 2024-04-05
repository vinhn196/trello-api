import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      //Xử lý cấu trúc data trc khi trả dữ liệu về
      getNewColumn.cards = []
      //Cập nhật mảng ColumnOrderIds trong colection board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    //
    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }

    const updatedColumn = await columnModel.update(columnId, updateData)

    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}
const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    console.log('🚀 ~ deleteItem ~ targetColumn:', targetColumn)
    if (!targetColumn) {
      throw new ApiError( StatusCodes.NOT_FOUND, 'column not found' )
    }

    //Xóa Column
    await columnModel.deleteOneById(columnId)
    //Xóa Cards thuộc Column trên
    await cardModel.deleteManyByColumnId(columnId)
    //Xóa columnId trong mảng columnOrderIds trong Board chứa nó
    await boardModel.pullColumnOrderIds(targetColumn)
    return { deleteResult:'Column and its cards deleted successfully!!!' }
  } catch (error) {
    throw new Error(error)
  }
}


export const columnService = {
  createNew,
  update,
  deleteItem
}