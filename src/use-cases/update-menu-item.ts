import type { MenuItem } from "@prisma/client";
import type { MenuItemsRepository } from "../repositories/menu-items-repository";
import { MenuNotFoundError } from "./errors/menu-not-found-error";

interface UpdateMenuItemUseCaseRequest {
  menuId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
}

interface UpdateMenuItemUseCaseResponse {
  menuItem: MenuItem;
}

export class UpdateMenuItemUseCase {
  constructor(private menuItemsReposiotry: MenuItemsRepository) {}

  async execute({
    menuId,
    name,
    description,
    price,
    imageUrl,
  }: UpdateMenuItemUseCaseRequest): Promise<UpdateMenuItemUseCaseResponse> {
    const menuItem = await this.menuItemsReposiotry.findById(menuId);

    if (!menuItem) {
      throw new MenuNotFoundError();
    }

    menuItem.name = name;
    menuItem.description = description ?? null;
    menuItem.price = price;
    menuItem.image = imageUrl ?? null;

    const updatedMenuItem = await this.menuItemsReposiotry.update(menuItem);

    return {
      menuItem: updatedMenuItem,
    };
  }
}
