export interface FindAllProducts {
  products: {
    id: string,
    name: string,
    description: string,
    salesPrice: number
  }[]
}
