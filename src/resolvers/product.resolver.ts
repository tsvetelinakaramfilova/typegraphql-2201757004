import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { ProductService } from '../services/product.service'
import { Product, ProductInput, PaginatedProductResponse } from '../schema/product.schema'
import { Context } from '../types/context'

@Resolver()
export class ProductResolver {

  constructor(private productService: ProductService) {
    this.productService = new ProductService()
  }

  @Query(() => PaginatedProductResponse)
  async products(@Args()paginatedInput: PaginationInput):Promise<PaginatedProductResponse> {
    return this.productService.getProducts(paginatedInput)
  }

  @Query(() => Product)
  async product(@Arg('_id') _id: string):Promise<Product> {
    return this.productService.getProduct(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Product)
  async createProduct(@Ctx(){ user }: Context, @Arg('product') product: ProductInput):Promise<Product> {
    return this.productService.createProduct(product, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Product)
  async deleteProduct(@Arg('_id') _id: string):Promise<Product> {
    return this.productService.deleteProduct(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Product)
  async updateProduct(@Arg('_id') _id: string,
                   @Arg('product') product: ProductInput):Promise<Product> {
    return this.productService.updateProduct(_id, product)
  }

}
