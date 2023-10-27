import { Address } from '../../@shared/domain/value_object/address_value_object';
import Id from '../../@shared/domain/value_object/id_value_object';
import Client from '../domain/client_entity';
import ClientGateway from '../gateway/client_gateway'
import { ClientModel } from './client_model';

export default class ClientRepository implements ClientGateway {

  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      document: client.document,
      email: client.email,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipcode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    })
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } })
    if(!client) {
      throw new Error('Client not found')
    }
    return new Client({
      id: new Id(client.dataValues.id),
      name: client.dataValues.name,
      document: client.dataValues.document,
      email: client.dataValues.email,
      address: new Address({
        street: client.dataValues.street,
        number: client.dataValues.number,
        complement: client.dataValues.complement,
        city: client.dataValues.city,
        state: client.dataValues.state,
        zipCode: client.dataValues.zipcode
      }),
      createdAt: client.dataValues.createdAt,
      updatedAt: client.dataValues.updatedAt
    })
  }
}
