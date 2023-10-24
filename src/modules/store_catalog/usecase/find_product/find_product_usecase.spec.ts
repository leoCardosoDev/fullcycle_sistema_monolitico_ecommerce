import Id from '../../../@shared/domain/value_object/id_value_object'
import Product from '../../domain/product_entity'
import FindProductUseCase from './find_product_usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description',
  salesPrice: 200
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('Find Product test', () => {
  test('Should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)
    const input = { id: '1' }
    const result = await usecase.execute(input)
    expect(productRepository.find).toHaveBeenCalled()
    expect(result.id).toBe('1')
    expect(result.name).toBe('Product 1')
    expect(result.description).toBe('Description')
    expect(result.salesPrice).toBe(200)
  })
})

