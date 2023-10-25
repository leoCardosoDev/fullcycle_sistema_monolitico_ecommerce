import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'transactions',
  timestamps: false
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({
    field: 'id',
  })
  public id!: string;

  @Column({
    field: 'orderId',
  })
  public orderId!: string;

  @Column({
    field: 'amount',
  })
  public amount!: number;

  @Column({
    field: 'status',
  })
  public status!: string;

  @Column({
    field: 'createdAt',
  })
  public createdAt!: Date;

  @Column({
    field: 'updatedAt',
  })
  public updatedAt!: Date;
}
