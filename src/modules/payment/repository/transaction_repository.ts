import { UpdatedAt } from 'sequelize-typescript';
import Transaction from '../domain/transaction';
import PaymentGateway from '../gateway/payment_gateway'
import TransactionModel from './transaction_model';

export default class TransactionRepository implements PaymentGateway {
  async save(input: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: input.id.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
    return new Transaction({
      id: input.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
