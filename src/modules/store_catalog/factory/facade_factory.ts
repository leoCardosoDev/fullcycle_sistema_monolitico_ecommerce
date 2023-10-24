import StoreCatalogFacade from "../facade/store_catalog_facade";
import ProductRepository from "../repository/product_repository";
import FindAllProductsUseCase from "../usecase/find_all_products/find_all_products_usecase";
import FindProductUseCase from "../usecase/find_product/find_product_usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository()
    const findUseCase = new FindProductUseCase(productRepository)
    const findAllUsecase = new FindAllProductsUseCase(productRepository)
    const facade = new StoreCatalogFacade({
      findUseCase: findUseCase,
      findAllUseCase: findAllUsecase
    })
    return facade
  }
}
