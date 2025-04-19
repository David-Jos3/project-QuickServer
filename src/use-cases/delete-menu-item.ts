import type { MenuItemsRepository } from "../repositories/menu-items-repository";

interface DeleteMenuItemUseCaseRequest {
  menuId: string;
}

export class DeleteMenuItemUseCase {
  constructor(private menuItemsRepository: MenuItemsRepository) {}

  async execute({ menuId }: DeleteMenuItemUseCaseRequest): Promise<void> {
    const menuExist = await this.menuItemsRepository.findById(menuId);

    if (!menuExist) {
      throw new Error("Menu not found");
    }

    await this.menuItemsRepository.delete(menuId);
  }
}
