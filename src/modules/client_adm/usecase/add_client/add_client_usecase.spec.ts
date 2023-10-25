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
      email: 'test@test.com',
      address: 'Address 1'
    }
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)
    const result = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })
})

