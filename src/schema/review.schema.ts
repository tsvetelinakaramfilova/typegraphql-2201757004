import { Field, InputType, ObjectType } from 'type-graphql'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import { IsDate, MinLength, IsNumber } from 'class-validator'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'
import { User } from './user.schema'
import { Types } from 'mongoose'

@ObjectType()
export class Review extends BaseModel {

  @Field()
  @Prop({ required: true })
  rating: number
  @Field()
  @Prop({ required: true })
  text: string
  @Field(() => Date)
  @Prop({ required: true })
  dateOfEntry: Date
  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>
}

export const ReviewModel = getModelForClass(Review,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class ReviewInput {
  @Field()
  @IsNumber()
  rating: number
  @Field()
  @MinLength(3)
  text: string
  @IsDate()
  @Field(() => Date)
  dateOfEntry: Date
}

@ObjectType()
export class PaginatedReviewResponse extends PaginatedResponse(Review) { }