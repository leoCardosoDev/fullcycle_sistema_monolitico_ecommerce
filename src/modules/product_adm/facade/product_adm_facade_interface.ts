export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDto): Promise<void>
  checkStock(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>
}

export interface AddProductFacadeInputDto {
  id?: string
  name: string
  description: string
  purchasePrice: number,
  stock: number
}

export interface CheckoutFacadeInputDto {
  productId: string
}

export interface CheckoutFacadeOutputDto {
  productId: string
  stock: number
}
