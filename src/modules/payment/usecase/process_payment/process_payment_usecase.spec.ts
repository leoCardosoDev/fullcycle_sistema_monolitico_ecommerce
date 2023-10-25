import Id from '../../../@shared/domain/value_object/id_value_object'
import Transaction from '../../domain/transaction'
import ProcessPaymentUseCase from './process_payment_usecase'

const transaction = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1',
  status: 'approved'
})

const MockeRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction))
  }
}

const transactionDeclined = new Transaction({
  id: new Id('2'),
  amount: 99,
  orderId: '2',
  status: 'declined'
})

const MockeRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
  }
}

describe('Process Payment Usecase test', () => {
  test('Should process payment', async () => {
    const paymentRepository = MockeRepository()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: '1',
      amount: 100
    }
    const result = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.amount).toBe(100)
    expect(result.status).toBe('approved')
    expect(result.orderId).toBe('1')
  })

  test('Should decline process payment', async () => {
    const paymentRepository = MockeRepositoryDeclined()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: '1',
      amount: 99
    }
    const result = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transactionDeclined.id.id)
    expect(result.amount).toBe(99)
    expect(result.status).toBe('declined')
    expect(result.orderId).toBe('2')
  })
})

