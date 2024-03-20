import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //Trả về kết quả , trong Service luôn phải có return
    return newBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew
}