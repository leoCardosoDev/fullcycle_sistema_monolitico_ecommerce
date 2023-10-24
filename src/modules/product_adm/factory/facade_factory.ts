import ProductAdmFacade from '../facade/product_adm_facade'
import ProductRepository from '../repository/product_repository'
import AddProductUsecase from '../usecase/add_product/add_product_usecase'
import CheckStockUseCase from '../usecase/check_stock/check_stock_usecase'

export default class ProductAdmFacadeFactory {
  static create () {
    const productRepository = new ProductRepository()
    const addProductUseCase = new AddProductUsecase(productRepository)
    const checkStockUsecase = new CheckStockUseCase(productRepository)
    const productFacade = new ProductAdmFacade({
      addUserCase: addProductUseCase,
      stockUseCase: checkStockUsecase
    })
    return productFacade
  }
}
