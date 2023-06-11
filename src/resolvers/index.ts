import { UserResolver } from './user.resolver'
import { ArticleResolver } from './article.resolver'
import { ProductResolver } from './product.resolver'
import { NutritionCategoryResolver } from './nutritionCategory.resolver'
import { RecepyService } from '../services/recepy.service'
export const resolvers = [
  UserResolver,
  ArticleResolver,
  ProductResolver,
  NutritionCategoryResolver,
  RecepyService,
] as const