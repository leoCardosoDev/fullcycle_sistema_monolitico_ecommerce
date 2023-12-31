import ClientGateway from '../../gateway/client_gateway'
import { FindClientInputDto, FindClientOutputDto } from './find_client_usecase_dto'

export default class FindClientUseCase {
  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const result = await this._clientRepository.find(input.id)
    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }
  }
}
