import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'clients',
  timestamps: false,
})

export class ClientModel extends Model {
  @PrimaryKey
  @Column({
    field: 'id',
  })
  public id!: string;

  @Column({
    field: 'name',
  })
  public name!: string;

  @Column({
    field: 'email',
  })
  public email!: string;

  @Column({
    field: 'address',
  })
  public address!: string;

  @Column({
    field: 'createdAt',
  })
  public createdAt!: Date;

  @Column({
    field: 'updatedAt',
  })
  public updatedAt!: Date;
}
