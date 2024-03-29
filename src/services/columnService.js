import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

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


export const columnService = {
  createNew
}