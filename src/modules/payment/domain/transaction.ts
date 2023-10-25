import AggregateRoot from '../../@shared/domain/entity/aggregate_root_interface'
import BaseEntity from '../../@shared/domain/entity/base_entity'
import Id from '../../@shared/domain/value_object/id_value_object'

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number
  private _orderId: string
  private _status: string

  constructor (props: TrasactionProps) {
    super(props.id)
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = props.status || 'pending'
  }

  validate(): void {
    if (this.amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }
  }

  approve(): void {
    this._status = 'approved'
  }

  decline(): void {
    this._status = 'declined'
  }

  process(): void {
    if (this._amount >= 100)
      this.approve()
    else {
      this.decline()
    }
  }

  get amount() {
    return this._amount
  }

  get orderId() {
    return this._orderId
  }

  get status() {
    return this._status
  }
}

type TrasactionProps = {
  id?: Id
  amount: number
  orderId: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
}
