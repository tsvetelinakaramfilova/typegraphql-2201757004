import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { ArticleInput, ArticleModel, ArticleInputReview } from '../schema/article.schema'
import { Types } from 'mongoose'
import { ReviewInput } from '../schema/review.schema'

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
  }
  async createArticle(article: ArticleInput, user: Types.ObjectId) {
    const articleWithUser = { ...article, user }
    const createdArticle = await ArticleModel.create(articleWithUser)
    return createdArticle
  }
  async deleteArticle(_id: string) {
    return ArticleModel.findByIdAndRemove(_id)
  }
  async updateArticle(_id: string, article: ArticleInput) {
    return ArticleModel.findByIdAndUpdate(_id, article, { new: true })
  }
  async updateArticleReviews(_id: string, article: ArticleInputReview) {
    return ArticleModel.findByIdAndUpdate(_id, article, { new: true })
  }
}