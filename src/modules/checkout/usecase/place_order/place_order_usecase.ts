import UseCaseInterface from '../../../@shared/usecase/use_case_interface'
import ClientAdmFacadeInterface from '../../../client_adm/facade/client_adm_facade_interface'
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place_order_dto'

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface

  constructor (clientFacade: ClientAdmFacadeInterface) {
    this._clientFacade = clientFacade
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId })
    if (!client) {
      throw new Error('Client not found')
    }
    return {
      id: '',
      invoiceId: '',
      status: '',
      total: 0,
      products: []
    }
  }
}
