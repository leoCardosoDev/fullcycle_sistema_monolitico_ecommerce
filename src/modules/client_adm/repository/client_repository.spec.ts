import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './client_model'
import ClientRepository from './client_repository'
import Id from '../../@shared/domain/value_object/id_value_object'
import Client from '../domain/client_entity'
import { Address } from '../../@shared/domain/value_object/address_value_object'

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
        id: new Id("1"),
        name: "Client 1",
        document: '123456',
        email: "client@example.com",
        address: new Address({
          street: "Main Street",
          number: "123",
          complement: "Next to the bank",
          city: "New York",
          state: "New York",
          zipCode: "122343404",
        })
    })
    const repository = new ClientRepository()
    await repository.add(client)
    const clientDb = await ClientModel.findOne({ where: { id: '1' } })
    expect(clientDb.dataValues).toBeDefined()
    expect(clientDb.dataValues.id).toBe(client.id.id)
    expect(clientDb.dataValues.name).toBe(client.name)
    expect(clientDb.dataValues.document).toBe(client.document)
    expect(clientDb.dataValues.email).toBe(client.email)
    expect(clientDb.dataValues.street).toBe(client.address.street)
    expect(clientDb.dataValues.number).toBe(client.address.number)
    expect(clientDb.dataValues.complement).toBe(client.address.complement)
    expect(clientDb.dataValues.city).toBe(client.address.city)
    expect(clientDb.dataValues.state).toBe(client.address.state)
    expect(clientDb.dataValues.zipcode).toBe(client.address.zipCode)
    expect(clientDb.dataValues.createdAt).toStrictEqual(client.createdAt)
    expect(clientDb.dataValues.updatedAt).toStrictEqual(client.updatedAt)
  })

  test('Should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      document: '123456',
      email: 'test@test.com',
      street: "Main Street",
      number: "123",
      complement: "Next to the bank",
      city: "New York",
      state: "New York",
      zipcode: "122343404",
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const repository = new ClientRepository()
    const result = await repository.find(client.dataValues.id)
    expect(result.id.id).toEqual(client.dataValues.id)
    expect(result.name).toEqual(client.dataValues.name)
    expect(result.document).toEqual(client.dataValues.document)
    expect(result.email).toEqual(client.dataValues.email)
    expect(result.address.street).toEqual(client.dataValues.street)
    expect(result.createdAt).toEqual(client.dataValues.createdAt)
    expect(result.updatedAt).toEqual(client.dataValues.updatedAt)
  })
})

