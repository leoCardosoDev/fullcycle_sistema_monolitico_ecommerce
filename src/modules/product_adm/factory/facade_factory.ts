import ProductAdmFacade from '../facade/product_adm_facade'
import ProductRepository from '../repository/product_repository'
import AddProductUsecase from '../usecase/add_product/add_product_usecase'

export default class ProductAdmFacadeFactory {
  static create () {
    const productRepository = new ProductRepository()
    const addProductUseCase = new AddProductUsecase(productRepository)
    const productFacade = new ProductAdmFacade({
      addUserCase: addProductUseCase,
      stockUseCase: undefined
    })
    return productFacade
  }
}
