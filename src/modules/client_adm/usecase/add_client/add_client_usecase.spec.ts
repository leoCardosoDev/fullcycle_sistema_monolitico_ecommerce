
import { Address } from "../../../@shared/domain/value_object/address_value_object"
import AddClientUseCase from "./add_client_usecase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Client usecase test', () => {
  test('Should add client', async () => {
    const input = {
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
    }
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)
    const result = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.document).toEqual(input.document)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })
})

