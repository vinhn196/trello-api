import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
      title: 'test custom title from service',
      columnOrderIds:['507f191e810c19729de860ea']
    }
    //Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //Trả về kết quả , trong Service luôn phải có return
    return getNewBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew
}