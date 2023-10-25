import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false
})
export class ProductModel extends Model {
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
    field: 'description',
  })
  public description!: string;

  @Column({
    field: 'purchasePrice',
  })
  public purchasePrice!: number;

  @Column({
    field: 'stock',
  })
  public stock!: number;

  @Column({
    field: 'createdAt',
  })
  public createdAt!: Date;

  @Column({
    field: 'updatedAt',
  })
  public updatedAt!: Date;
}
