import Id from '../../../@shared/domain/value_object/id_value_object';
import UseCaseInterface from '../../../@shared/usecase/use_case_interface';
import Client from '../../domain/client_entity';
import ClientGateway from '../../gateway/client_gateway';
import { AddClientInputDto, AddClientOutputDto } from './add_client_usecase_dto';

export default class AddClientUseCase implements UseCaseInterface {
  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      document: input.document,
      email: input.email,
      address: input.address
    }
    const client = new Client(props)
    this._clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      document: client.document,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
