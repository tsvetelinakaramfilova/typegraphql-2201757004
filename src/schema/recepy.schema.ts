import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'
import { Review } from './review.schema'
import { Product } from './product.schema'

@ObjectType()
export class Recepy extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  // @Field(() => [String])
  // @Prop({ required: true, type: [String] }) 
  @Field()
  @Prop({ nullable: true })
  images?: string[]

  @Field()
  @Prop({ required: true })
  description: string

  //@Prop([{ quantityProduct: Number, product: { type: Types.ObjectId, ref: 'Product' } }])
  // products?: Array<{ quantityProduct: number, product: Product }>;
  @Field(() => [{ quantityProduct: Number, product: Product }])
  @Prop({ type: [{ quantityProduct: Number, product: { ref: Product } }] })
  products?: { quantityProduct: number; product: Ref<Product, Types.ObjectId> }[];

  // @Field(() => User)
  // @Prop({ ref: User, required: true })
  // user: Ref<User, Types.ObjectId>

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  timeToCook: number

  @Field(() => [Review])
  @Prop({ type: [{ ref: Review }] })
  reviews?: Ref<Review, Types.ObjectId>[]
}

export const RecepyModel = getModelForClass(Recepy,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class RecepyInput {
  @Field()
  @MinLength(3)
  name: string
  @Field()
  @MinLength(3)
  description: string
  @IsDate()
  @Field(() => Date)
  dateOfEntry: Date
  @Field()
  @MinLength(1)
  timeToCook: number
}

@ObjectType()
export class PaginatedRecepyResponse extends PaginatedResponse(Recepy) { }
