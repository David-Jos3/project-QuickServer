import type { MenuItem } from "@prisma/client";
import type { MenuItemsRepository } from "../repositories/menu-items-repository";


interface  CreateMenuItemRequest { 
  name: string;
  description: string;
  price: number;
}

interface CreateMenuItemResponse { 
  menuItem: MenuItem
}

export class CreateMenuItemsUseCase {
  constructor(private menuItemsRepository: MenuItemsRepository  ) {}

  async execute({ name , price, description}: CreateMenuItemRequest): Promise<CreateMenuItemResponse> {

    const menuItem = await this.menuItemsRepository.create({
      name,
      price,
      description,
    })

    return { menuItem }
  }
}