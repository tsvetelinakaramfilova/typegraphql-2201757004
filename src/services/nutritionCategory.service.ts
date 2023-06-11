import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { NutritionCategoryInput, NutritionCategoryModel, NutritionCategoryInputProduct} from '../schema/nutritionCategory.schema'
import { Types } from 'mongoose'
import { ReviewInput } from '../schema/review.schema'

export class NutritionCategoryService {
  async getNutritionCategorys(paginatedInput: PaginationInput) {
    const nutritionCategorysPaginationServices =
        new PaginationService(
          {
            model: NutritionCategoryModel,
            populate: 'user',
          })
    return nutritionCategorysPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getNutritionCategory(_id: string) {
    return NutritionCategoryModel.findById(_id).lean()
  }
  async createNutritionCategory(nutritionCategory: NutritionCategoryInput, user: Types.ObjectId) {
    const nutritionCategoryWithUser = { ...nutritionCategory, user }
    const createdNutritionCategory = await NutritionCategoryModel.create(nutritionCategoryWithUser)
    return createdNutritionCategory
  }
  async deleteNutritionCategory(_id: string) {
    return NutritionCategoryModel.findByIdAndRemove(_id)
  }
  async updateNutritionCategory(_id: string, nutritionCategory: NutritionCategoryInput) {
    return NutritionCategoryModel.findByIdAndUpdate(_id, nutritionCategory, { new: true })
  }
  async updateNutritionCategoryProducts(_id: string, nutritionCategory: NutritionCategoryInputProduct) {
    return NutritionCategoryModel.findByIdAndUpdate(_id, nutritionCategory)
  }
}