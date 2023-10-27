import AggregateRoot from "../../@shared/domain/entity/aggregate_root_interface"
import BaseEntity from "../../@shared/domain/entity/base_entity"
import { Address } from "../../@shared/domain/value_object/address_value_object"
import Id from "../../@shared/domain/value_object/id_value_object"

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string
  private _document: string
  private _email: string
  private _address: Address

  constructor (props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._document = props.document
    this._email = props.email
    this._address = props.address
  }

  get name(): string {
    return this._name
  }

  get document(): string {
    return this._document
  }

  get email(): string {
    return this._email
  }
  
  get address(): Address {
    return this._address
  }

}

type ClientProps = {
  id?: Id,
  name: string,
  document: string;
  email: string,
  address: Address,
  createdAt?: Date,
  updatedAt?: Date,
}
