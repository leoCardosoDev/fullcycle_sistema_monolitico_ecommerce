import ClientAdmFacade from "../facade/client_adm_facade";
import ClientRepository from "../repository/client_repository";
import AddClientUseCase from "../usecase/add_client/add_client_usecase";
import FindClientUseCase from "../usecase/find_client/find_client_usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const repository = new ClientRepository()
    const findUsecase = new FindClientUseCase(repository)
    const addUsecase = new AddClientUseCase(repository)
    const facade = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: findUsecase
    })
    return facade
  }
}
