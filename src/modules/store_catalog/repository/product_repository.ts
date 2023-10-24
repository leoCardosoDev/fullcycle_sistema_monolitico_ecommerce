import Id from '../../@shared/domain/value_object/id_value_object';
import Product from '../domain/product_entity'
import ProductGateway from '../gateway/product_gateway'
import { ProductModel } from './product_model';

export default class ProductRepository implements ProductGateway {

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map((product) => 
      new Product({
        id: new Id(product.dataValues.id),
        name: product.dataValues.name,
        description: product.dataValues.description,
        salesPrice: product.dataValues.salesPrice
      })
    )
  }
  find(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
