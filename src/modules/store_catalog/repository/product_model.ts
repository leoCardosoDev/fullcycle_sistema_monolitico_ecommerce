import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'products',
  timestamps: false
})
export class ProductModel extends Model {
  @Column({
    primaryKey: true, // Defina como chave primária
    field: 'id' // Nome da coluna na tabela do banco de dados
  })
  public id!: string;

  @Column({
    field: 'name' // Nome da coluna na tabela do banco de dados
  })
  public name!: string;

  @Column({
    field: 'description' // Nome da coluna na tabela do banco de dados
  })
  public description!: string;

  @Column({
    field: 'salesPrice' // Nome da coluna na tabela do banco de dados
  })
  public salesPrice!: number;
}
