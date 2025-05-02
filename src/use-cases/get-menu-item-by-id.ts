import type { MenuItemsRepository } from "@/repositories/menu-items-repository";
import type { MenuItem } from "@prisma/client";
import { MenuNotFoundError } from "./errors/menu-not-found-error";

interface GetMenuItemByIdUseCaseRequest {
  menuId: string;
}

interface GetMenuItemByIdUseCaseResponse {
  menuItem: MenuItem;
}

export class GetMenuItemByIdUseCase {
  constructor(private menuItemsRepositories: MenuItemsRepository) {}

  async execute({
    menuId,
  }: GetMenuItemByIdUseCaseRequest): Promise<GetMenuItemByIdUseCaseResponse> {
    const menuItem = await this.menuItemsRepositories.findById(menuId);

    if (!menuItem) {
      throw new MenuNotFoundError();
    }

    return {
      menuItem,
    };
  }
}
