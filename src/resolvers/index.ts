import { UserResolver } from './user.resolver'
// import { BookingResolver } from './booking.resolver'
import {ArticleResolver} from './article.resolver'
export const resolvers = [
  UserResolver,
  // BookingResolver,
  ArticleResolver,
] as const