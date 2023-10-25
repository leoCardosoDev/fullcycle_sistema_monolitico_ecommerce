import Id from '../../@shared/domain/value_object/id_value_object';
import Client from '../domain/client_entity';
import ClientGateway from '../gateway/client_gateway'
import { ClientModel } from './client_model';

export default class ClientRepository implements ClientGateway {

  async add(client: Client): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } })
    if(!client) {
      throw new Error('Client not found')
    }
    return new Client({
      id: new Id(client.dataValues.id),
      name: client.dataValues.name,
      email: client.dataValues.email,
      address: client.dataValues.address,
      createdAt: client.dataValues.createdAt,
      updatedAt: client.dataValues.updatedAt
    })
  }
}
