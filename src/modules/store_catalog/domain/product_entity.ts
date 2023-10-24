import AggregateRoot from "../../@shared/domain/entity/aggregate_root_interface";
import BaseEntity from "../../@shared/domain/entity/base_entity";
import Id from "../../@shared/domain/value_object/id_value_object";

type ProductProps = {
  id: Id,
  name: string,
  description: string,
  salesPrice: number
}

export default class Product extends BaseEntity implements AggregateRoot {
  private _name: string
  private _description: string
  private _salesPrice: number

  constructor (props: ProductProps) {
    super(props.id)
    this._name = props.name
    this._description = props.description
    this._salesPrice = props.salesPrice
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get salesPrice(): number {
    return this._salesPrice
  }
}
