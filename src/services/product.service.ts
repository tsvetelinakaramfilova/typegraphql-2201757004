import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { ProductInput, ProductModel } from '../schema/product.schema'
import { Types } from 'mongoose'

export class ProductService {
  async getProducts(paginatedInput: PaginationInput) {
    const productsPaginationServices =
        new PaginationService(
          {
            model: ProductModel,
            populate: 'user',
          })
    return productsPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getProduct(_id: string) {
    return ProductModel.findById(_id).lean()
  }

  async createProduct(product: ProductInput, user: Types.ObjectId) {
    const productWithUser = { ...product, user }
    const createdProduct = await ProductModel.create(productWithUser)
    return createdProduct
  }
  async deleteProduct(_id: string) {
    return ProductModel.findByIdAndRemove(_id)
  }
  async updateProduct(_id: string, product: ProductInput) {
    return ProductModel.findByIdAndUpdate(_id, product, { new: true })
  }
}