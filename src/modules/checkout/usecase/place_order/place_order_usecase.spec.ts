import { PlaceOrderInputDto } from './place_order_dto'
import PlaceOrderUseCase from './place_order_usecase'

describe('PlaceOrderUseCase test', () => {
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

