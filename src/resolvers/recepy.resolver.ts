import { Resolver, Query, Arg, Args, Mutation, Authorized, Ctx } from 'type-graphql'
import { PaginationInput } from '../schema/pagination.schema'
import { UserRole } from '../enums/user-role'
import { RecepyService } from '../services/recepy.service'
import { Recepy, RecepyInput, PaginatedRecepyResponse } from '../schema/recepy.schema'
import { Context } from '../types/context'

@Resolver()
export class RecepyResolver {

  constructor(private recepyService: RecepyService) {
    this.recepyService = new RecepyService()
  }

  @Query(() => PaginatedRecepyResponse)
  async recepys(@Args()paginatedInput: PaginationInput):Promise<PaginatedRecepyResponse> {
    return this.recepyService.getRecepys(paginatedInput)
  }

  @Query(() => Recepy)
  async recepy(@Arg('_id') _id: string):Promise<Recepy> {
    return this.recepyService.getRecepy(_id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Recepy)
  async createRecepy(@Ctx(){ user }: Context, @Arg('recepy') recepy: RecepyInput):Promise<Recepy> {
    return this.recepyService.createRecepy(recepy, user._id)
  }

  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Recepy)
  async deleteRecepy(@Arg('_id') _id: string):Promise<Recepy> {
    return this.recepyService.deleteRecepy(_id)
  }
  
  @Authorized([UserRole.SUPER_ADMIN, UserRole.ADMIN ])
  @Mutation(() => Recepy)
  async updateRecepy(@Arg('_id') _id: string,
                   @Arg('recepy') recepy: RecepyInput):Promise<Recepy> {
    return this.recepyService.updateRecepy(_id, recepy)
  }

}
