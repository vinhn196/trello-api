import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCard = {
      ...reqBody
    }
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      //Xử lý cấu trúc data trc khi trả dữ liệu về
      getNewCard.cards = []
      //Cập nhật mảng CardOrderIds trong colection board
      await columnModel.pushCardOrderIds(getNewCard)
    }

    //
    return getNewCard
  } catch (error) { throw error }
}


export const cardService = {
  createNew
}