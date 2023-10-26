import UseCaseInterface from '../../../@shared/usecase/use_case_interface'
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place_order_dto'

export default class PlaceOrderUseCase implements UseCaseInterface {

  constructor () {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    return {
      id: '',
      invoiceId: '',
      status: '',
      total: 0,
      products: []
    }
  }
}
