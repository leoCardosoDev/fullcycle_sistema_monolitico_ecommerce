import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction_model"
import Transaction from "../domain/transaction"
import Id from "../../@shared/domain/value_object/id_value_object"
import TransactionRepository from "./transaction_repository"

describe('Transaction test', () => {
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
  test('Should save a transaction', async () => {
    const transaction = new Transaction({
      id: new Id('1'),
      amount: 100,
      orderId: '1'
    })
    transaction.approve()
    const repository = new TransactionRepository()
    const result = await repository.save(transaction)
    expect(result.id).toBeDefined()
    expect(result.id.id).toBe(transaction.id.id)
    expect(result.status).toBe('approved')
    expect(result.amount).toBe(transaction.amount)
    expect(result.orderId).toBe(transaction.orderId)
  })
})

