import { Sequelize } from "sequelize-typescript"
import { ClientModel } from "../repository/client_model"
import ClientRepository from "../repository/client_repository"
import AddClientUseCase from "../usecase/add_client/add_client_usecase"
import ClientAdmFacade from "./client_adm_facade"
import FindClientUseCase from "../usecase/find_client/find_client_usecase"

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
    const repository = new ClientRepository()
    const addUsecase = new AddClientUseCase(repository)
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: undefined
    })
    const input = {
      id: '1',
      name: 'Client 1',
      email: 'test@test.com',
      address: 'Address 1'
    }
    await facade.add(input)
    const client = await ClientModel.findOne({ where: { id: '1'} })
    expect(client).toBeDefined()
    expect(client.dataValues.id).toBe(input.id)
    expect(client.dataValues.name).toBe(input.name)
    expect(client.dataValues.email).toBe(input.email)
    expect(client.dataValues.address).toBe(input.address)
  })

  test('Should find a Client', async () => {
    const repository = new ClientRepository()
    const findUsecase = new FindClientUseCase(repository)
    const addUsecase = new AddClientUseCase(repository)
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase
    })

    const input = {
      id: '1',
      name: 'CLient 1',
      email: 'test@test.com',
      address: 'Address 1'
    }

    await facade.add(input)

    const client = await facade.find({ id: '1' })
    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
    expect(client.email).toBe(input.email)
    expect(client.address).toBe(input.address)
  })
})

