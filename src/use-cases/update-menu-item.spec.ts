import { InMemoryMenuItemRepository } from "../../test/repositories/in-memory-menu-item";
import { CreateMenuItemsUseCase } from "./create-menu-item";
import { UpdateMenuItemUseCase } from "./update-menu-item";

let inMemorymenuItemsRepository: InMemoryMenuItemRepository;
let updateMenuItemUseCase: UpdateMenuItemUseCase;
let createMenuItemUseCase: CreateMenuItemsUseCase;

describe("Update Menu Item Use Case", () => {
  beforeEach(() => {
    inMemorymenuItemsRepository = new InMemoryMenuItemRepository();
    updateMenuItemUseCase = new UpdateMenuItemUseCase(
      inMemorymenuItemsRepository
    );
    createMenuItemUseCase = new CreateMenuItemsUseCase(
      inMemorymenuItemsRepository
    );
  });

  test("should be able to update a menu item", async () => {
    const menuItem = await createMenuItemUseCase.execute({
      name: "Pizza",
      description: "Delicious pizza",
      price: 10,
      imageUrl: "http://example.com/pizza.jpg",
    });

    const updatedMenuItem = await updateMenuItemUseCase.execute({
      menuId: menuItem.menuItem.id,
      name: "Updated Pizza",
      description: "Updated delicious pizza",
      price: 12,
      imageUrl: "http://example.com/updated-pizza.jpg",
    });

    expect(updatedMenuItem.menuItem.name).toBe("Updated Pizza");
    expect(updatedMenuItem.menuItem.description).toBe(
      "Updated delicious pizza"
    );
    expect(updatedMenuItem.menuItem.price).toBe(12);
    expect(updatedMenuItem.menuItem.image).toBe(
      "http://example.com/updated-pizza.jpg"
    );
  });
});
