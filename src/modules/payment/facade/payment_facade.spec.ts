import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction_model"
import TransactionRepository from "../repository/transaction_repository"
import ProcessPaymentUseCase from "../usecase/process_payment/process_payment_usecase"
import PaymentFacade from "./payment_facade"

describe('Payment Facade test', () => {
  let sequelize: Sequelize

  beforeEach( async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  test('Should create transaction', async () => {
    const repository = new TransactionRepository()
    const usecase = new ProcessPaymentUseCase(repository)
    const facade = new PaymentFacade(usecase)

    const input = {
      orderId: 'order-1',
      amount: 100
    }

    const output = await facade.process(input)
    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toBe(input.orderId)
    expect(output.amount).toBe(input.amount)
    expect(output.status).toBe('approved')
  })
})
