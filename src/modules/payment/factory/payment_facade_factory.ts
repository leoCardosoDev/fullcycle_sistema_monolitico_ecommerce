import PaymentFacade from '../facade/payment_facade'
import PaymentFacadeInterface from '../facade/payment_facade_interface'
import TransactionRepository from '../repository/transaction_repository'
import ProcessPaymentUseCase from '../usecase/process_payment/process_payment_usecase'

export default class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const repository = new TransactionRepository()
    const usecase = new ProcessPaymentUseCase(repository)
    const facade = new PaymentFacade(usecase)
    return facade
  }
}
