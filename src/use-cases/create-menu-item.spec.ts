import { CreateMenuItemsUseCase } from "./create-menu-item";
import { InMemoryMenuItemRepository } from "../../test/repositories/in-memory-menu-item";

let inMemoryMenuItemRepository: InMemoryMenuItemRepository;
let createMenuItemsUseCase: CreateMenuItemsUseCase;

describe("Create Menu-Item Use Case", () => {
  beforeEach(() => {
    inMemoryMenuItemRepository = new InMemoryMenuItemRepository();
    createMenuItemsUseCase = new CreateMenuItemsUseCase(
      inMemoryMenuItemRepository
    );
  });

  test("should be able to create menu", async () => {
    const { menuItem } = await createMenuItemsUseCase.execute({
      description: "Três Queijos",
      name: "Pastel (10CMX15CM APROX)",
      price: 16.0,
    });

    expect(menuItem.name).toBe("Pastel (10CMX15CM APROX)");
  });
});
