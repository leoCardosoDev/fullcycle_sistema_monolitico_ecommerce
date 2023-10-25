import Client from "../domain/client_entity";

export default interface ClientGateway {
  add(client: Client): Promise<void>
  find(id: string): Promise<Client>
}
