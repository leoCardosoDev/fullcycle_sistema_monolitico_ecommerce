import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './client_model'
import ClientRepository from './client_repository'
import Id from '../../@shared/domain/value_object/id_value_object'
import Client from '../domain/client_entity'

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

  test('Should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'CLient 1',
      email: 'test@test.com',
      address: 'Address 1'
    })
    const repository = new ClientRepository()
    await repository.add(client)
    const clientDb = await ClientModel.findOne({ where: { id: '1' } })
    expect(clientDb.dataValues).toBeDefined()
    expect(clientDb.dataValues.id).toBe(client.id.id)
    expect(clientDb.dataValues.name).toBe(client.name)
    expect(clientDb.dataValues.email).toBe(client.email)
    expect(clientDb.dataValues.address).toBe(client.address)
    expect(clientDb.dataValues.createdAt).toStrictEqual(client.createdAt)
    expect(clientDb.dataValues.updatedAt).toStrictEqual(client.updatedAt)
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

