import { InvoiceFacade } from "../facade/invoice_facade";
import { InvoiceRepository } from "../repository/invoice_repository";
import { FindInvoiceUseCase } from "../usecase/find/find_invoice_usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate_invoice_usecase";

export class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    const repository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);

    const invoiceFacade = new InvoiceFacade({
      findUseCase: findInvoiceUseCase,
      generateUseCase: generateInvoiceUseCase,
    });

    return invoiceFacade;
  }
}
