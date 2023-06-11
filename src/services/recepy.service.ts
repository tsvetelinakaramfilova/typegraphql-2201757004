import { PaginationInput } from '../schema/pagination.schema'
import { PaginationService } from './pagination.service'
import { RecepyInput, RecepyModel } from '../schema/recepy.schema'
import { Types } from 'mongoose'

export class RecepyService {
  async getRecepys(paginatedInput: PaginationInput) {
    const recepysPaginationServices =
        new PaginationService(
          {
            model: RecepyModel,
            populate: 'user',
          })
    return recepysPaginationServices.getPaginatedItems(paginatedInput)
  }
  async getRecepy(_id: string) {
    return RecepyModel.findById(_id).lean()
  }

  async createRecepy(recepy: RecepyInput, user: Types.ObjectId) {
    const recepyWithUser = { ...recepy, user }
    const createdRecepy = await RecepyModel.create(recepyWithUser)
    return createdRecepy
  }
  async deleteRecepy(_id: string) {
    return RecepyModel.findByIdAndRemove(_id)
  }
  async updateRecepy(_id: string, recepy: RecepyInput) {
    return RecepyModel.findByIdAndUpdate(_id, recepy, { new: true })
  }
}