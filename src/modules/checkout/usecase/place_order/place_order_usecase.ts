import { Address } from '../../../@shared/domain/value_object/address_value_object'
import Id from '../../../@shared/domain/value_object/id_value_object'
import UseCaseInterface from '../../../@shared/usecase/use_case_interface'
import { InvoiceFacadeInterface } from '../../../invoice/facade/invoice_facade_interface'
import PaymentFacadeInterface from '../../../payment/facade/payment_facade_interface'
import ProductAdmFacadeInterface from '../../../product_adm/facade/product_adm_facade_interface'
import StoreCatalogFacadeInterface from '../../../store_catalog/facade/store_catalog_facade_interface'
import ClientAdmFacadeInterface from '../../../client_adm/facade/client_adm_facade_interface'
import Client from '../../domain/client_entity'
import Order from '../../domain/order_entity'
import Product from '../../domain/product_entity'
import CheckoutGateway from '../../gateway/checkout_gateway'
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place_order_dto'

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface
  private _productFacade: ProductAdmFacadeInterface
  private _catalogFacade: StoreCatalogFacadeInterface
  private _repository: CheckoutGateway
  private _invoiceFacade: InvoiceFacadeInterface
  private _paymentFacade: PaymentFacadeInterface

  constructor (
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface, 
    catalogFacade: StoreCatalogFacadeInterface,
    repository: CheckoutGateway,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
    ) {
    this._clientFacade = clientFacade
    this._productFacade = productFacade
    this._catalogFacade = catalogFacade
    this._repository = repository
    this._invoiceFacade = invoiceFacade
    this._paymentFacade = paymentFacade
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId })
    if (!client) {
      throw new Error('Client not found')
    }
    await this.validateProducts(input)

    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    )

    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      document: client.document,
      email: client.email,
      address: new Address({
        street: "Main Street",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "122343404",
      })
    })

    const order = new Order({
      client: myClient,
      products,
    })


    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total
    })

    const invoice = payment.status === "approved" ? await this._invoiceFacade.generateInvoice({
      name: client.name,
      document: client.document,
      street: client.address.street,
      complement: client.address.complement,
      number: client.address.number,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      items: products.map((p) => {
        return {
          id: p.id.id,
          name: p.name,
          price: p.salesPrice
        }
      }),
    }) : null
    payment.status === 'approved' && order.approved()
    this._repository.addOrder(order)
  
    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map((product) => {
        return {
          productId: product.id.id
        }
      })
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

  private async getProduct (productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId })
    if(!product) {
      throw new Error('Product not found')
    }
    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
    return new Product(productProps)
  }
}
