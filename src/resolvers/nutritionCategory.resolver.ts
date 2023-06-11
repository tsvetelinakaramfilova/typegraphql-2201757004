import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { NutritionCategoryService } from '../services/nutritionCategory.service'
import { NutritionCategory, NutritionCategoryInput, PaginatedNutritionCategoryResponse, NutritionCategoryInputProduct } from '../schema/nutritionCategory.schema'
import { Context } from '../types/context'

@Resolver()
export class NutritionCategoryResolver {

  constructor(private nutritionCategoryService: NutritionCategoryService) {
    this.nutritionCategoryService = new NutritionCategoryService()
  }

  @Query(() => PaginatedNutritionCategoryResponse)
  async nutritionCategorys(@Args()paginatedInput: PaginationInput):Promise<PaginatedNutritionCategoryResponse> {
    return this.nutritionCategoryService.getNutritionCategorys(paginatedInput)
  }

  @Query(() => NutritionCategory)
  async nutritionCategory(@Arg('_id') _id: string):Promise<NutritionCategory> {
    return this.nutritionCategoryService.getNutritionCategory(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => NutritionCategory)
  async createNutritionCategory(@Ctx(){ user }: Context, @Arg('nutritionCategory') nutritionCategory: NutritionCategoryInput):Promise<NutritionCategory> {
    return this.nutritionCategoryService.createNutritionCategory(nutritionCategory, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => NutritionCategory)
  async deleteNutritionCategory(@Arg('_id') _id: string):Promise<NutritionCategory> {
    return this.nutritionCategoryService.deleteNutritionCategory(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => NutritionCategory)
  async updateNutritionCategory(@Arg('_id') _id: string,
                   @Arg('nutritionCategory') nutritionCategory: NutritionCategoryInput):Promise<NutritionCategory> {
    return this.nutritionCategoryService.updateNutritionCategory(_id, nutritionCategory)
  }

  @Mutation(() => NutritionCategory)
  async updateNutritionCategoryWithProducts(@Arg('_id') _id: string,
                   @Arg('nutritionCategory') nutritionCategory: NutritionCategoryInputProduct):Promise<NutritionCategory> {
    return this.nutritionCategoryService.updateNutritionCategoryProducts(_id, nutritionCategory)
  }
}
