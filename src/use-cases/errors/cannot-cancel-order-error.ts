export class CannotCancelOrderError extends Error {
  constructor() {
    super("Não foi possível cancelar o pedido");
  }
}
