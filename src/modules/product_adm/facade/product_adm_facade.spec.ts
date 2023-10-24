import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../repository/product_model"
import ProductAdmFacadeFactory from "../factory/facade_factory"

describe('Product Adm Facade test', () => {
  let sequelize: Sequelize

  beforeEach( async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })
    sequelize.options.logging = false
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should create a product', async () => {
    const productFacade = ProductAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Description one',
      purchasePrice: 100,
      stock: 10
    }
    await productFacade.addProduct(input)
    const product = await ProductModel.findOne( {logging: false, where: { id: '1'} })
    expect(product.dataValues).toBeDefined()
    expect(product.dataValues.id).toBe(input.id)
    expect(product.dataValues.name).toBe(input.name)
    expect(product.dataValues.description).toBe(input.description)
    expect(product.dataValues.purchasePrice).toBe(input.purchasePrice)
    expect(product.dataValues.stock).toBe(input.stock)
  })
})

