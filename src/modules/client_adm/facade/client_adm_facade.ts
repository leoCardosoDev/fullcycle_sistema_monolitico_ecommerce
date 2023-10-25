import UseCaseInterface from '../../@shared/usecase/use_case_interface';
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from './client_adm_facade_interface'

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUsecase: UseCaseInterface
  private _findUsecase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUsecase
    this._findUsecase = usecaseProps.findUsecase
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input)
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    throw new Error('Method not implemented.');
  }

}

export interface UseCaseProps {
  addUsecase: UseCaseInterface
  findUsecase: UseCaseInterface
}
