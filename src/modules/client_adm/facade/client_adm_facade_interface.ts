import { Address } from "../../@shared/domain/value_object/address_value_object"

export default interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>
}

export interface AddClientFacadeInputDto {
  id?: string,
  name: string,
  document: string,
  email: string
  address: Address
}

export interface FindClientFacadeInputDto {
  id: string
}

export interface FindClientFacadeOutputDto {
  id?: string
  name: string
  document: string
  email: string
  address: Address
  createdAt: Date
  updatedAt: Date
}
