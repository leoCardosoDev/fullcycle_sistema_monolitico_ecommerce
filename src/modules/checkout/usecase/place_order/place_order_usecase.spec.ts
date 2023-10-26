import Id from '../../../@shared/domain/value_object/id_value_object'
import Product from '../../domain/product_entity'
import { PlaceOrderInputDto } from './place_order_dto'
import PlaceOrderUseCase from './place_order_usecase'

const mockDate = new Date(2000, 1, 1)

describe('PlaceOrderUseCase test', () => {
  describe('Validate Products Methods', () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase()
    test('Should throw error if no products are selected', async () => {
      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: []
      }
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('No products selected'))
    })

    test('Should throw an error when product is out of stock', async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: {productId: string}) => Promise.resolve({
          productId,
          stock: productId === '1' ? 0 : 1
        }))
      }
      //@ts-expect-error -  force set clientFacade
      placeOrderUseCase['_productFacade'] = mockProductFacade
      let input: PlaceOrderInputDto = {
        clientId: '0',
        products: [{productId: '1'}]
      }
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'))
      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }]
      }
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'))
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'))
      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }, { productId: '2' }]
      }
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'))
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(7)
    })
  })

  describe('Get Products method', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase()
    test('Should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null)
      }
      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade
      await expect(placeOrderUseCase['getProduct']('0')).rejects.toThrow(new Error('Product not found'))
    })

    test('Should return a product', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: '0',
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0
        })
      }
      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade
      await expect(placeOrderUseCase['getProduct']('0')).resolves.toEqual(
        new Product({
          id: new Id('0'),
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0
        })
      )
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1)
    })

  })

  describe('Execute method', () => {
    test('Should throw an error when client not found', async () => {
      const MockClientFacade = {
        find: jest.fn().mockResolvedValue(null)
      }
      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase()
      //@ts-expect-error -  force set clientFacade
      placeOrderUseCase['_clientFacade'] = MockClientFacade
      const input: PlaceOrderInputDto = { clientId: '0', products: [] }
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'))
    })

    test('Should throw an error when product are not valid', async () => {
      const MockClientFacade = {
        find: jest.fn().mockResolvedValue(true)
      }
      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase()
      const mockValidateProducts = jest
      //@ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, 'validateProducts')
      //@ts-expect-error - not return never
      .mockRejectedValue(new Error('No products selected'))
      //@ts-expect-error -  force set clientFacade
      placeOrderUseCase['_clientFacade'] = MockClientFacade
      const input: PlaceOrderInputDto = { clientId: '1', products: []}
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('No products selected'))
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })
  })

})

