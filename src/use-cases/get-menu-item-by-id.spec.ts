import { InMemoryMenuItemRepository } from "./../../test/repositories/in-memory-menu-item";
import { CreateMenuItemsUseCase } from "./create-menu-item";
import { GetMenuItemByIdUseCase } from "./get-menu-item-by-id";

let inMemoryMenuItemRepository: InMemoryMenuItemRepository;
let getMenuItemByIdUseCase: GetMenuItemByIdUseCase;
let createMenuItemsUseCase: CreateMenuItemsUseCase;

describe("Get Menu Item By Id", () => {
  beforeEach(() => {
    inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
    createMenuItemsUseCase = new CreateMenuItemsUseCase(
      inMemoryMenuItemRepository
    );
    getMenuItemByIdUseCase = new GetMenuItemByIdUseCase(
      inMemoryMenuItemRepository
    );
  });

  test("should be able to get a menu item by id", async () => {
    const { menuItem } = await createMenuItemsUseCase.execute({
      description: "Description-test",
      name: "Name-test",
      price: 10,
      imageUrl: "http://image.com",
    });

    const result = await getMenuItemByIdUseCase.execute({
      menuId: menuItem.id,
    });

    expect(result.menuItem).toEqual(menuItem);
  });
});
