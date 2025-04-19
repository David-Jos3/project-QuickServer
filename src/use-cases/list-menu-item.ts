import type { MenuItem } from "@prisma/client";
import type { MenuItemsRepository } from "../repositories/menu-items-repository";

interface ListMenuItemUseCaseResponse {
  menuItems: MenuItem[];
}

export class ListMenuItemUseCase {
  constructor(private menuItemsRepository: MenuItemsRepository) {}

  async execute(): Promise<ListMenuItemUseCaseResponse> {
    const menuItems = await this.menuItemsRepository.findAll();

    return { menuItems };
  }
}
