import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { ReviewService } from '../services/review.service'
import { Review, ReviewInput, PaginatedReviewResponse } from '../schema/review.schema'
import { Context } from '../types/context'

@Resolver()
export class ReviewResolver {

  constructor(private reviewService: ReviewService) {
    this.reviewService = new ReviewService()
  }

  @Query(() => PaginatedReviewResponse)
  async reviews(@Args()paginatedInput: PaginationInput):Promise<PaginatedReviewResponse> {
    return this.reviewService.getReviews(paginatedInput)
  }

  @Query(() => Review)
  async review(@Arg('_id') _id: string):Promise<Review> {
    return this.reviewService.getReview(_id)
  }

  @Mutation(() => Review)
  async createReview(@Ctx(){ user }: Context, @Arg('review') review: ReviewInput):Promise<Review> {
    return this.reviewService.createReview(review, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Review)
  async deleteReview(@Arg('_id') _id: string):Promise<Review> {
    return this.reviewService.deleteReview(_id)
  }
}
