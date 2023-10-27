import UseCaseInterface from '../../../@shared/usecase/use_case_interface';
import { InvoiceGateway } from '../../gateway/invoice_gateway';
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find_invoice_dto'

export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);
    const items = invoice.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price,
    }));

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items,
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}
