import { Address } from "../../../@shared/domain/value_object/address_value_object";
import Id from "../../../@shared/domain/value_object/id_value_object";
import UseCaseInterface from "../../../@shared/usecase/use_case_interface";
import { Invoice } from "../../domain/invoice";
import { Product } from "../../domain/product";
import { InvoiceGateway } from "../../gateway/invoice_gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate_invoice_dto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const {
      name,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
      items,
    } = input;

    const invoice = new Invoice({
      name,
      document,
      address: new Address({
        street,
        number,
        complement,
        city,
        state,
        zipCode,
      }),
      items: items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });

    await this.invoiceRepository.add(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((product) => ({
        id: product.id.id,
        name: product.name,
        price: product.price,
      })),
      total: invoice.total,
    };
  }
}
