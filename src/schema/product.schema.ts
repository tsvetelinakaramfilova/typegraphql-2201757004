import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { MinLength, IsNumber } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'

@ObjectType()
export class Product extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  @Field()
  @Prop({ nullable: true })
  image?: string

  @Field(() => Number)
  @Prop({ required: true, type: Number})
  calories: number

  @Field(() => Number)
  @Prop({ required: true, type: Number})
  protein: number

  @Field(() => Number)
  @Prop({ required: true, type: Number})
  carbohydratea: number

  @Field(() => Number)
  @Prop({ required: true, type: Number})
  fats: number

  @Field()
  @Prop({ required: true })
  description: string

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>
}

export const ProductModel = getModelForClass(Product,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class ProductInput {
  @Field()
  @MinLength(2)
  name: string
  @Field()
  @IsNumber()
  calories: number
  @Field()
  @IsNumber()
  protein: number
  @Field()
  @IsNumber()
  carbohydratea: number
  @Field()
  @IsNumber()
  fats: number
  @Field()
  @MinLength(3)
  description: string
}

@ObjectType()
export class PaginatedProductResponse extends PaginatedResponse(Product) { }
