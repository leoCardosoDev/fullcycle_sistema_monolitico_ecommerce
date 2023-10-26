import UseCaseInterface from '../../../@shared/usecase/use_case_interface'
import ClientAdmFacadeInterface from '../../../client_adm/facade/client_adm_facade_interface'
import ProductAdmFacadeInterface from '../../../product_adm/facade/product_adm_facade_interface'
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place_order_dto'

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface
  private _productFacade: ProductAdmFacadeInterface

  constructor (clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
    this._clientFacade = clientFacade
    this._productFacade = productFacade
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId })
    if (!client) {
      throw new Error('Client not found')
    }

    await this.validateProducts(input)

    return {
      id: '',
      invoiceId: '',
      status: '',
      total: 0,
      products: []
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected')
    }
    for(const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId
      })
      if (product.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`)
      }
    }
  }
}
