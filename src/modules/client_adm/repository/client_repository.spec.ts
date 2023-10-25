import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './client_model'
import ClientRepository from './client_repository'

describe('Client Repository test', () => {
  let sequelize: Sequelize

  beforeEach( async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  test('Should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'test@test.com',
      address: 'Address 1',
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const repository = new ClientRepository()
    const result = await repository.find(client.dataValues.id)

    expect(result.id.id).toEqual(client.dataValues.id)
    expect(result.name).toEqual(client.dataValues.name)
    expect(result.email).toEqual(client.dataValues.email)
    expect(result.address).toEqual(client.dataValues.address)
    expect(result.createdAt).toEqual(client.dataValues.createdAt)
    expect(result.updatedAt).toEqual(client.dataValues.updatedAt)
  })
})

