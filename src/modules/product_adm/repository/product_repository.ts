import Id from '../../@shared/domain/value_object/id_value_object'
import Product from '../domain/product_entity'
import ProductGateway from '../gateway/product_gateway'
import { ProductModel } from './product_model'

export default class ProductRepository implements ProductGateway {

  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt:new Date(),
      updatedAt: new Date()
    })
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ logging: false, where: {id} })
    if (!product) throw new Error(`Product with ${id} not found`)
    return new Product({
      id: new Id(product.dataValues.id),
      name: product.dataValues.name,
      description: product.dataValues.description,
      purchasePrice: product.dataValues.purchasePrice,
      stock: product.dataValues.stock,
      createdAt: product.dataValues.createdAt,
      updatedAt: product.dataValues.updatedAt
    })
  }

}
