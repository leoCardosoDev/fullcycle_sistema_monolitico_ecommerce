import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client_model"
import ClientAdmFacadeFactory from "../factory/client_adm_facade_factory"
import { Address } from "../../@shared/domain/value_object/address_value_object"


describe('Client Adm Facade test', () => {
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
    const facade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'Client 1',
      document: '123456',
      email: 'test@test.com',
      address: new Address({
        street: "Main Street",
        number: "123",
        complement: "Next to the bank",
        city: "New York",
        state: "New York",
        zipCode: "122343404"
      })
    }
    await facade.add(input)
    const client = await ClientModel.findOne({ where: { id: '1'} })
    expect(client).toBeDefined()
    expect(client.dataValues.id).toBe(input.id)
    expect(client.dataValues.name).toBe(input.name)
    expect(client.dataValues.document).toBe(input.document)
    expect(client.dataValues.email).toBe(input.email)
    expect(client.dataValues.street).toBe(input.address.street)
  })

  test('Should find a Client', async () => {
    const facade = ClientAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'CLient 1',
      document: '123456',
      email: 'test@test.com',
      address: new Address({
      street: "Main Street",
      number: "123",
      complement: "Next to the bank",
      city: "New York",
      state: "New York",
      zipCode: "122343404",
    })
    }
    await facade.add(input)
    const client = await facade.find({ id: '1' })
    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.document).toBe(input.document)
    expect(client.email).toBe(input.email)
    expect(client.address.street).toBe(input.address.street)
  })
})

