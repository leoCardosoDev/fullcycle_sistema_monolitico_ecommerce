import { Address } from "../../../@shared/domain/value_object/address_value_object"
import Id from "../../../@shared/domain/value_object/id_value_object";
import Client from "../../domain/client_entity";
import FindClientUseCase from "./find_client_usecase";

const client = new Client({
  id: new Id('1'),
  name: 'Client 1',
  document: '123456',
  email: 'test@test.com',
  address: new Address({
    street: "Main Street",
    number: "123",
    complement: "Next to the bank",
    city: "New York",
    state: "New York",
    zipCode: "122343404",
  })
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe('Find Client usecase test', () => {
  test('Should find a client', async () => {
    const repository = MockRepository()
    const usecase = new FindClientUseCase(repository)
    const input = { id: '1' }
    const result = await usecase.execute(input)
    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(client.id.id)
    expect(result.name).toEqual(client.name)
    expect(result.document).toEqual(client.document)
    expect(result.email).toEqual(client.email)
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})

