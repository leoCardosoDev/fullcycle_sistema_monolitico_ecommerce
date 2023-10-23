import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product_model'
import Product from '../domain/product_entity'
import Id from '../../@shared/domain/value_object/id_value_object'
import ProductRepository from './product_repository'

describe('Product Repository test', () => {
  let sequileze: Sequelize

  beforeEach( async () => {
    sequileze = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })
    await sequileze.addModels([ProductModel])
    await sequileze.sync()
  })

  afterEach(async () => {
    await sequileze.close()
  })

  test('Should create a product', async () => {
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    }
    const product = new Product(productProps)
    const productRepository = new ProductRepository()
    await productRepository.add(product)
    const productDb = await ProductModel.findOne({ where: { id: productProps.id.id }, })
    expect(productProps.id.id).toEqual(productDb.dataValues.id)
    expect(productProps.name).toEqual(productDb.dataValues.name)
    expect(productProps.description).toEqual(productDb.dataValues.description)
    expect(productProps.purchasePrice).toEqual(productDb.dataValues.purchasePrice)
    expect(productProps.stock).toEqual(productDb.dataValues.stock)
  })
})
