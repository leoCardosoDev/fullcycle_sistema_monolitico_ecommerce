import BaseEntity from '../../@shared/domain/entity/base_entity'
import Id from '../../@shared/domain/value_object/id_value_object'
import Client from './client_entity'
import Product from './product_entity'

export default class Order extends BaseEntity {
  private _client: Client
  private _products: Product[]
  private _status: string

  constructor (props: OrderProps) {
    super(props.id)
    this._client = props.client
    this._products = props.products
    this._status = props.status || 'pending'
  }

  approved(): void {
    this._status = 'approved'
  }

  get client(): Client {
    return this._client
  }

  get products(): Product[] {
    return this._products
  }

  get status(): string {
    return this._status
  }

  get total(): number {
    return this._products.reduce((total, product) => {
      return total + product.salesPrice
    }, 0)
  }
}

type OrderProps =  {
  id?: Id
  client: Client
  products: Product[]
  status?: string
}
