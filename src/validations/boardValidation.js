/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev' * '
 * A bit of fragrance clings to the hand that gives flowers!'
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {

  //Validate ở BackEnd là bắt buộc vì đây là điểm cuối lưu trữ dữ liệu vào Database
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required!!',
      'string.empty': 'Title cant be empty!!',
      'string.max': 'Title length must be less than or equa to 5 characters long',
      'string.min': 'Title length must be at least 3 characters long',
      'string.trim': 'Title must not have leading or trailing whitespace  '
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log('req.body: ', req.body)
    //Chỉ định abortEarly: false để trường hợp nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    res.status(StatusCodes.CREATED).json({ message: 'POST from Validation: APi create new board' })
  } catch (error) {
    console.log(error)
    console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}