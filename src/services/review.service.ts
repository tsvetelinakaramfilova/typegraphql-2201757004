import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { ReviewInput, ReviewModel } from '../schema/review.schema'
import { Types } from 'mongoose'

export class ReviewService {
  async getReviews(paginatedInput: PaginationInput) {
    const userPaginationServices =
        new PaginationService(
          {
            model: ReviewModel,
            populate: 'user',
          })
    return userPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getReview(_id: string) {
    return ReviewModel.findById(_id).populate('user').lean()
  }
  async createReview(review: ReviewInput, user: Types.ObjectId) {
    const reviewWithUser = { ...review, user }
    const createdReview = await ReviewModel.create(reviewWithUser)
    return createdReview.populate('user')
  }
  async deleteReview(_id: string) {
    return ReviewModel.findByIdAndRemove(_id).populate('user')
  }
}