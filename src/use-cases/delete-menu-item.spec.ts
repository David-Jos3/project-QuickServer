import { InMemoryMenuItemRepository } from "./../../test/repositories/in-memory-menu-item";
import { CreateMenuItemsUseCase } from "./create-menu-item";
import { DeleteMenuItemUseCase } from "./delete-menu-item";

let inMemoryMenuItemRepository: InMemoryMenuItemRepository;
let deleteMenuItemUseCase: DeleteMenuItemUseCase;
let createMenuItemUseCase: CreateMenuItemsUseCase;

describe("Delete Menu Item Use Case", () => {
  beforeEach(() => {
    inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
    deleteMenuItemUseCase = new DeleteMenuItemUseCase(
      inMemoryMenuItemRepository
    );
    createMenuItemUseCase = new CreateMenuItemsUseCase(
      inMemoryMenuItemRepository
    );
  });

  test("must be able to delete a menu item", async () => {
    const { menuItem } = await createMenuItemUseCase.execute({
      name: "Pizza (Fatia)",
      description: "KIT KAT",
      price: 8.0,
    });

    await deleteMenuItemUseCase.execute({
      menuId: menuItem.id,
    });

    const deletedItem = await inMemoryMenuItemRepository.findById(menuItem.id);

    expect(deletedItem).toBeNull();
  });
});
