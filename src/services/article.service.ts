import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { ArticleInput, ArticleModel } from '../schema/article.schema'
import { Types } from 'mongoose'

export class ArticleService {
  async getArticles(paginatedInput: PaginationInput) {
    const articlesPaginationServices =
        new PaginationService(
          {
            model: ArticleModel,
            populate: 'user',
          })
    return articlesPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getArticle(_id: string) {
    return ArticleModel.findById(_id).lean()
    // return ArticleModel.findById(_id).populate('user').lean()
  }
  // async createArticle(booking: ArticleInput, user: Types.ObjectId) {
  async createArticle(article: ArticleInput, user: Types.ObjectId) {
    // const bookingWithUser = { ...booking, user }
    const articleWithUser = { ...article, user }
    const createdArticle = await ArticleModel.create(articleWithUser)
    return createdArticle
    // return createdArticle.populate('user')
  }
  async deleteArticle(_id: string) {
    return ArticleModel.findByIdAndRemove(_id)
    // return ArticleModel.findByIdAndRemove(_id).populate('user')
  }
  async updateArticle(_id: string, article: ArticleInput) {
    return ArticleModel.findByIdAndUpdate(_id, article, { new: true })
    // return ArticleModel.findByIdAndUpdate(_id, booking, { new: true }).populate('user')
  }
  // async updateArticleReview(_id: string, article: ArticleInput) {
  //   return ArticleModel.findByIdAndUpdate(_id, article, { new: true })
  //   // return ArticleModel.findByIdAndUpdate(_id, booking, { new: true }).populate('user')
  // }
}