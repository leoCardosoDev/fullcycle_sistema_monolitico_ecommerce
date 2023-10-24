import UseCaseInterface from "../../../@shared/usecase/use_case_interface";
import ProductGateway from "../../gateway/product_gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find_product_dto";

export default class FindProductUseCase implements UseCaseInterface {
  constructor (private productRepository: ProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id)
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}
