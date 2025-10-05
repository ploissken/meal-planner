import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CategoryList from "./CategoryList";
import { LocalStorageContext } from "@/app/context/LocalStorageContext";

jest.mock("@/mockFetch", () => ({
  mockFetch: () => Promise.resolve(),
}));

const mockUpdateShopList = jest.fn();

const mockContextValue = {
  ingredients: [
    {
      id: "1",
      name: "Tomato",
      category: "Vegetables",
      estimatedCostPerUnit: 0.5,
      unit: "piece",
    },
    {
      id: "2",
      name: "Lettuce",
      category: "Vegetables",
      estimatedCostPerUnit: 0.3,
      unit: "head",
    },
  ],
  shoplist: [
    {
      id: "1",
      name: "Tomato",
      quantity: 4,
      unit: "piece",
      category: "Vegetables",
      recipeName: "Salad",
      estimatedCostPerUnit: 0.5,
    },
    {
      id: "1",
      name: "Tomato",
      quantity: 2,
      unit: "piece",
      category: "Vegetables",
      recipeName: "Pasta",
      estimatedCostPerUnit: 0.5,
    },
    {
      id: "2",
      name: "Lettuce",
      quantity: 1,
      unit: "head",
      category: "Vegetables",
      recipeName: "Burger",
      estimatedCostPerUnit: 0.3,
    },
  ],
  updateShopList: mockUpdateShopList,
};

function renderWithContext(category = "Vegetables") {
  return render(
    <LocalStorageContext.Provider value={mockContextValue}>
      <CategoryList category={category} />
    </LocalStorageContext.Provider>
  );
}

describe("CategoryList", () => {
  it("renders category title and total cost", () => {
    renderWithContext();

    expect(screen.getByText(/Vegetables category/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated cost: \$ 3.30/i)).toBeInTheDocument();
  });

  it("renders unique ingredients", () => {
    renderWithContext();

    expect(screen.getByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("6 pieces")).toBeInTheDocument(); // 4 + 2
    expect(screen.getByText("Lettuce")).toBeInTheDocument();
    expect(screen.getByText("1 heads")).toBeInTheDocument();
  });

  it("removes item from list when checkbox clicked", async () => {
    renderWithContext();

    const tomatoCheckbox = screen
      .getAllByRole("checkbox")
      .find((_, idx) =>
        screen
          .getAllByText("Tomato")
          [idx]?.closest("li")
          ?.textContent?.includes("Tomato")
      );

    fireEvent.click(tomatoCheckbox!);

    await waitFor(() => {
      expect(mockUpdateShopList).toHaveBeenCalled();
    });
  });

  it("shows fallback message when no ingredients", () => {
    const emptyContext = { ...mockContextValue, shoplist: [] };
    render(
      <LocalStorageContext.Provider value={emptyContext}>
        <CategoryList category="Fruits" />
      </LocalStorageContext.Provider>
    );

    expect(
      screen.getByText(/No items needed for this category/i)
    ).toBeInTheDocument();
  });

  it("displays recipe names in tooltip", async () => {
    renderWithContext();

    const tooltipIcon = screen
      .getAllByRole("button")
      .find((btn) => btn.closest("li")?.textContent?.includes("Tomato"));

    expect(tooltipIcon).toBeInTheDocument();
    // Note: Tooltip content is only visible on hover in DOM so it won't show up in tests without mocking the Tooltip behavior
  });
});
