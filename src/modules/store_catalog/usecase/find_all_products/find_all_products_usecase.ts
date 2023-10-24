import UseCaseInterface from "../../../@shared/usecase/use_case_interface";
import ProductGateway from "../../gateway/product_gateway";

export default class FindAllProductsUseCase implements UseCaseInterface {

  constructor(private productRepository: ProductGateway) {}

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll()
    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }
  }
}
