import { InMemoryMenuItemRepository } from "../../test/repositories/in-memory-menu-item";
import { CreateMenuItemsUseCase } from "./create-menu-item";
import { ListMenuItemUseCase } from "./list-menu-item";

let inMemoryMenuItemRepository: InMemoryMenuItemRepository;
let listMenuItemUseCase: ListMenuItemUseCase;
let createMenuItemUseCase: CreateMenuItemsUseCase;

describe("List Menu Item Use Case", () => {
  beforeEach(() => {
    inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
    listMenuItemUseCase = new ListMenuItemUseCase(inMemoryMenuItemRepository);
    createMenuItemUseCase = new CreateMenuItemsUseCase(
      inMemoryMenuItemRepository
    );
  });

  test("must be able to display all menu items", async () => {
    const item1 = await createMenuItemUseCase.execute({
      description: "romeu e julieta",
      name: "Pastel",
      price: 8.0,
    });

    const item2 = await createMenuItemUseCase.execute({
      description: "romeu e julieta",
      name: "Pizza (Fatia)",
      price: 8.0,
    });

    const { menuItems } = await listMenuItemUseCase.execute();

    expect(menuItems).toHaveLength(2);

    expect(menuItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: item1.menuItem.id,
        }),
        expect.objectContaining({
          id: item2.menuItem.id,
        }),
      ])
    );
  });
});
