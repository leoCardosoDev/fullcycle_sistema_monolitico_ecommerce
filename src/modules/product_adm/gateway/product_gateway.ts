import Product from "../domain/product_entity";

export default interface ProductGateway {
  add(product:Product): Promise<void>
  find(id: string): Promise<Product>
}
