import Id from '../../../@shared/domain/value_object/id_value_object'
import Product from '../../domain/product_entity'
import FindAllProductsUseCase from './find_all_products_usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 200
})

const product2 = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Description 2',
  salesPrice: 400
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
  }
}

describe('Find all products usecase test', () => {
  test('Should find all products', async () => {
    const productRepository = MockRepository()
    const usecase = new FindAllProductsUseCase(productRepository)
    const result = await usecase.execute()
    expect(productRepository.findAll).toHaveBeenCalled()
    expect(result.products.length).toBe(2)
    expect(result.products[0].id).toBe('1')
    expect(result.products[0].name).toBe('Product 1')
    expect(result.products[0].description).toBe('Description 1')
    expect(result.products[0].salesPrice).toBe(200)
    expect(result.products[1].id).toBe('2')
    expect(result.products[1].name).toBe('Product 2')
    expect(result.products[1].description).toBe('Description 2')
    expect(result.products[1].salesPrice).toBe(400)
  })
})

