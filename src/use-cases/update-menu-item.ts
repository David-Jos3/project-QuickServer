import type { MenuItem } from "@prisma/client";
import type { MenuItemsRepository } from "../repositories/menu-items-repository";

interface UpdateMenuItemUseCaseRequest {
  menuId: string;
  name: string;
  description?: string;
  price: number;
  image: string;
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
    image,
  }: UpdateMenuItemUseCaseRequest): Promise<UpdateMenuItemUseCaseResponse> {
    const menuItem = await this.menuItemsReposiotry.findById(menuId);

    if (!menuItem) {
      throw new Error("Menu item not found");
    }

    menuItem.name = name;
    menuItem.description = description ?? null;
    menuItem.price = price;
    menuItem.image = image ?? null;

    const updatedMenuItem = await this.menuItemsReposiotry.update(menuItem);

    return {
      menuItem: updatedMenuItem,
    };
  }
}
