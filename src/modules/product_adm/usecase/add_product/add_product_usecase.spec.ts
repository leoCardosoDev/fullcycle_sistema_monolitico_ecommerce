import AddProductUsecase from './add_product_usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Product usecase Unit Test', () => {
  test('Should add a product', async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUsecase(productRepository)
    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }
    const result = await usecase.execute(input)
    expect(productRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined
    expect(result.name).toBe(input.name)
    expect(result.description).toBe(input.description)
    expect(result.purchasePrice).toBe(input.purchasePrice)
    expect(result.stock).toBe(input.stock)
  })
})
