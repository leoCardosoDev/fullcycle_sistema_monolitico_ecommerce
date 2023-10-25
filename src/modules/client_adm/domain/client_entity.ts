import AggregateRoot from '../../@shared/domain/entity/aggregate_root_interface';
import BaseEntity from '../../@shared/domain/entity/base_entity';
import Id from '../../@shared/domain/value_object/id_value_object'

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string
  private _email: string
  private _address: string

  constructor (props: ClientProps) {
    super(props.id)
    this._name = props.name
    this._email = props.email
    this._address = props.address
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }
  
  get address(): string {
    return this._address
  }
}

type ClientProps = {
  id?: Id,
  name: string,
  email: string,
  address: string
}
