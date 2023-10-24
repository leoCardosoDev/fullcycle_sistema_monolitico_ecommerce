import FindAllProductsUseCase from "../usecase/find_all_products/find_all_products_usecase";
import FindProductUseCase from "../usecase/find_product/find_product_usecase";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store_catalog_facade_interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

  private _findUseCase: FindProductUseCase
  private _findAllUseCase: FindAllProductsUseCase

  constructor (props: UseCaseProps) {
    this._findUseCase = props.findUseCase
    this._findAllUseCase = props.findAllUseCase
  }

  async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return await this._findUseCase.execute(id)
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return await this._findAllUseCase.execute()
  }
}

export interface UseCaseProps {
  findUseCase: FindProductUseCase
  findAllUseCase: FindAllProductsUseCase
}
