import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { MinLength } from 'class-validator'

@ObjectType()
export class Product extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  // @Field(() => [String])
  // @Prop({ required: true, type: [String] }) 
  @Field()
  @Prop({ nullable: true })
  image?: string

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  calories: number

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  protein: number

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  carbohydratea: number

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  fats: number

  @Field()
  @Prop({ required: true })
  description: string
}

export const ProductModel = getModelForClass(Product,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class ProductInput {
  @Field()
  @MinLength(3)
  name: string
  @Field()
  @MinLength(1)
  calories: number
  @Field()
  @MinLength(1)
  protein: number
  @Field()
  @MinLength(1)
  carbohydratea: number
  @Field()
  @MinLength(1)
  fats: number
  @Field()
  @MinLength(3)
  description: string
}

@ObjectType()
export class PaginatedProductResponse extends PaginatedResponse(Product) { }
