import Id from '../../../@shared/domain/value_object/id_value_object'
import Product from '../../domain/product_entity'
import ProductGateway from '../../gateway/product_gateway'
import { AddProductInputDto, AddProductOutputDto } from './add_product_dto'

export default class AddProductUsecase {
  private _productRepository: ProductGateway

  constructor (productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock
    }
    const product = new Product(props)
    await this._productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}
