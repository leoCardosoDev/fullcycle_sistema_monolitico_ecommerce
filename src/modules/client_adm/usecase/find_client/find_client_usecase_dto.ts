import { Address } from "../../../@shared/domain/value_object/address_value_object"

export interface FindClientInputDto {
  id: string
}

export interface FindClientOutputDto {
  id: string
  name:string
  document: string
  email: string
  address: Address
  createdAt: Date
  updatedAt: Date
}
