import { Address } from "../../../@shared/domain/value_object/address_value_object"

export interface AddClientInputDto {
  id?: string
  name: string
  document: string
  email: string
  address: Address
}

export interface AddClientOutputDto {
  id: string
  name: string
  document: string
  email: string
  address: Address
  createdAt: Date
  updatedAt: Date
}
