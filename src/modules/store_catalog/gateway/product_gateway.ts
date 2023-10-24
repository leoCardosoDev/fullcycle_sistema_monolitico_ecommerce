import Product from '../domain/product_entity'

export default interface ProductGateway {
  findAll(): Promise<Product[]>
  find(id: string): Promise<Product>
}
