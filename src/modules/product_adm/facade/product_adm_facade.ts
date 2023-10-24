import UseCaseInterface from '../../@shared/usecase/use_case_interface'
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, CheckoutFacadeInputDto, CheckoutFacadeOutputDto } from './product_adm_facade_interface'

export interface UseCaseProps {
  addUserCase: UseCaseInterface
  stockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsercase: UseCaseInterface
  private _checkoutUsecase: UseCaseInterface

  constructor (usecaseProps: UseCaseProps) {
    this._addUsercase = usecaseProps.addUserCase
    this._checkoutUsecase = usecaseProps.stockUseCase
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsercase.execute(input)
  }

  checkStock(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto> {
    return this._checkoutUsecase.execute(input)
  }
}
