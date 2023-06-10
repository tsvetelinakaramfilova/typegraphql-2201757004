import { ArgsType, Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { getModelForClass, prop as Prop } from '@typegoose/typegoose'
import { UserRole } from '../enums/user-role'
import { IsEmail, MinLength, MaxLength, IsPositive } from 'class-validator'
import PaginatedResponse from './pagination.schema'
import { BaseModel } from './model.schema'
import { Gender } from '../enums/gender'

registerEnumType(UserRole, {
  name: 'UserRole',
})
registerEnumType(Gender, {
  name: 'Gender',
})
@ObjectType()
export class User extends BaseModel {

  @Prop({ required: true })
  @Field()
  firstName: string
  @Prop({ required: true })
  @Field()
  lastName: string
  @Prop({ required: true })
  @Field()
  email: string
  @Prop({ required: true })
  @Field()
  password: string
  @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
  @Field(() => [UserRole])
  roles: UserRole[]
  @Prop({ required: true })
  @Field()
  kg: number
  @Prop({ required: true })
  @Field()
  kgGoal: number
  @Prop({ required: true })
  @Field()
  height: number
  @Prop({ required: true })
  @Field()
  age: number
  @Prop({ required: true })
  @Field()
  indexActivity: number
  @Prop({ type: String, enum: Gender })
  @Field(() => Gender)
  gender: Gender
}

export const UserModel = getModelForClass(User,
  {
    schemaOptions: { timestamps: true },
  })

@InputType()
export class BaseUserInput {
  @Field()
  @MaxLength(30)
  firstName: string
  @Field()
  @MaxLength(30)
  lastName: string
  @Field()
  @MinLength(6)
  password: string
  @Field()
  @IsPositive()
  kg: number
  @Field()
  @IsPositive()
  kgGoal: number
  @Field()
  @IsPositive()
  height: number
  @Field()
  @IsPositive()
  age: number
  @Field()
  @IsPositive()
  indexActivity: number
  @Field(() => Gender)
  @MinLength(2)
  gender: Gender
}
@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @IsEmail()
  email: string
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) { }

@ArgsType()
export class UserLoginArgs {
  @Field()
  @IsEmail()
  email: string
  @MinLength(6)
  @Field()
  password: string
}