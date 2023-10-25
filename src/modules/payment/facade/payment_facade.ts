import UseCaseInterface from '../../@shared/usecase/use_case_interface';
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from './payment_facade_interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}
  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input)
  }
}
