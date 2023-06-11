import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { ArticleService } from '../services/article.service'
import { Article, ArticleInput, PaginatedArticleResponse, ArticleInputReview } from '../schema/article.schema'
import { Context } from '../types/context'

@Resolver()
export class ArticleResolver {

  constructor(private articleService: ArticleService) {
    this.articleService = new ArticleService()
  }

  @Query(() => PaginatedArticleResponse)
  async articles(@Args()paginatedInput: PaginationInput):Promise<PaginatedArticleResponse> {
    return this.articleService.getArticles(paginatedInput)
  }

  @Query(() => Article)
  async article(@Arg('_id') _id: string):Promise<Article> {
    return this.articleService.getArticle(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Article)
  async createArticle(@Ctx(){ user }: Context, @Arg('article') article: ArticleInput):Promise<Article> {
    return this.articleService.createArticle(article, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Article)
  async deleteArticle(@Arg('_id') _id: string):Promise<Article> {
    return this.articleService.deleteArticle(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Article)
  async updateArticle(@Arg('_id') _id: string,
                   @Arg('article') article: ArticleInput):Promise<Article> {
    return this.articleService.updateArticle(_id, article)
  }

  @Mutation(() => Article)
  async updateArticleWithReviews(@Arg('_id') _id: string,
                   @Arg('article') article: ArticleInputReview):Promise<Article> {
    return this.articleService.updateArticleReviews(_id, article)
  }
}
