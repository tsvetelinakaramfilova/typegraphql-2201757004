import { Field, InputType, ObjectType } from 'type-graphql'
import { BaseModel } from './model.schema'
import { getModelForClass, prop as Prop, Ref } from '@typegoose/typegoose'
import PaginatedResponse from './pagination.schema'
import { IsDate, MinLength, IsString, IsNumber } from 'class-validator'
import { User } from './user.schema'
import { Types } from 'mongoose'
import { Review } from './review.schema'

@ObjectType()
export class Article extends BaseModel {

  @Field()
  @Prop({ required: true })
  name: string

  // @Field(() => [String])
  // @Prop({ required: true, type: [String] }) 
  @Field(() => [String])
  @Prop({ nullable: true, type: [String]})
  images?: string[]

  @Field()
  @Prop({ required: true })
  description: string

  @Field(() => Date)
  @Prop({ required: true })
  dateOfEntry: Date

  // @Field(() => Number)
  // @Prop({ required: true, type: Number})
  @Field()
  @Prop({ required: true })
  timeRead: number

  @Field(() => [String])
  @Prop({ nullable: true, type: [String] })
  tags?: string[]

  @Field(() => User)
  @Prop({ ref: User, required: true })
  user: Ref<User, Types.ObjectId>

  // @Field(() => [Review])
  // @Prop({ type: [{ ref: Review }] })
  // reviews?: Ref<Review, Types.ObjectId>[]

}

export const ArticleModel = getModelForClass(Article,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class ArticleInput {
  @Field()
  @MinLength(3)
  name: string
  @Field()
  @MinLength(3)
  description: string
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  images?: string[]
  @IsDate()
  @Field(() => Date)
  dateOfEntry: Date
  @Field()
  @IsNumber()
  timeRead: number
  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  tags?: string[]
}

// @InputType()
// export class ArticleInputReview {
//   @Field(() => [Review])
//   reviews?: Ref<Review, Types.ObjectId>[]
// }

@ObjectType()
export class PaginatedArticleResponse extends PaginatedResponse(Article) { }
