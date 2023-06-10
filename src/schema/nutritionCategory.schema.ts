import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength } from 'class-validator'
import { Types } from 'mongoose'
import { Product } from './product.schema'

@ObjectType()
export class NutritionCategory extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  @Field()
  @Prop({ nullable: true })
  image?: string

  // @Field(() => Product)
  // @Prop({ ref: Product, required: true })
  // products: Ref<Product, Types.ObjectId>
  @Field(() => [Product])
  @Prop({ type: [{ ref: Product }] })
  products?: Ref<Product, Types.ObjectId>[]
}

export const NutritionCategoryModel = getModelForClass(NutritionCategory,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class NutritionCategoryInput {
  @Field()
  @MinLength(3)
  name: string
}

@ObjectType()
export class PaginatedNutritionCategoryResponse extends PaginatedResponse(NutritionCategory) { }
