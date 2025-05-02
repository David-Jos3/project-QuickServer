import type { MenuItemsRepository } from "../repositories/menu-items-repository";
import { MenuNotFoundError } from "./errors/menu-not-found-error";

interface DeleteMenuItemUseCaseRequest {
  menuId: string;
}

export class DeleteMenuItemUseCase {
  constructor(private menuItemsRepository: MenuItemsRepository) {}

  async execute({ menuId }: DeleteMenuItemUseCaseRequest): Promise<void> {
    const menuExist = await this.menuItemsRepository.findById(menuId);

    if (!menuExist) {
      throw new MenuNotFoundError();
    }

    await this.menuItemsRepository.delete(menuId);
  }
}
