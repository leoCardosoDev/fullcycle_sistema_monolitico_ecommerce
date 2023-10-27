import AggregateRoot from '../../@shared/domain/entity/aggregate_root_interface'
import BaseEntity from '../../@shared/domain/entity/base_entity'
import { Address } from '../../@shared/domain/value_object/address_value_object'
import Id from '../../@shared/domain/value_object/id_value_object'
import { Product } from './product'


type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: Product[];

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
  }

  get name() {
    return this._name;
  }

  get document() {
    return this._document;
  }

  get address() {
    return this._address;
  }

  get items() {
    return this._items;
  }

  get total() {
    let total = 0;
    this._items.forEach((item) => {
      total = total + item.price;
    });

    return total;
  }
}
