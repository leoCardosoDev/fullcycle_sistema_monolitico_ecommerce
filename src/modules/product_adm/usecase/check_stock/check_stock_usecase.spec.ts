import Id from "../../../@shared/domain/value_object/id_value_object"
import Product from "../../domain/product_entity"
import CheckStockUseCase from "./check_stock_usecase"

const product = new Product({
  id: new Id('1'),
  name: 'Product name',
  description: 'Description product',
  purchasePrice: 100,
  stock: 10
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('Checkout Stock usecase test', () => {
  test('Should get stock of a product', async () => {
    const productRepository = MockRepository()
    const checkStockUseCase = new CheckStockUseCase(productRepository)
    const input = { productId: '1' }
    const result = await checkStockUseCase.execute(input)
    expect(productRepository.find).toHaveBeenCalled()
    expect(result.productId).toBe('1')
  })
})

