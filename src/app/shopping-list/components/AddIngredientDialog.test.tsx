// AddIngredientDialog.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddIngredientDialog from "./AddIngredientDialog";
import { LocalStorageContext } from "@/app/context/LocalStorageContext";
import { RecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";

const mockIngredients = [
  { id: "1", name: "Tomato", unit: "piece", category: "Vegetables" },
  { id: "2", name: "Salt", unit: "tsp", category: "Spices" },
];

const mockUpdateShopList = jest.fn();

function renderWithContext(ui: React.ReactElement) {
  return render(
    <RecipeGalleryContext.Provider
      value={{
        recipes: [],
        loading: false,
        cuisines: [],
        restrictions: [],
        selectedCuisines: [],
        setSelectedCuisines: jest.fn(),
        maxCookingTime: 0,
        maxCookingTimeFromRecipe: 0,
        setMaxCookingTime: jest.fn(),
        selectedRestrictions: [],
        setSelectedRestrictions: jest.fn(),
        searchInput: "",
        setSearchInput: jest.fn(),
        resetFilters: jest.fn(),
        getRecipeById: () => undefined,
      }}
    >
      <LocalStorageContext.Provider
        value={{
          ingredients: mockIngredients,
          shoplist: [],
          updateShopList: mockUpdateShopList,
          mealPlan: [],
          updateMealPlan: jest.fn(),
          weekdays: [],
          getIngredientCategories: jest.fn(),
          notes: [],
          updateNotes: jest.fn(),
        }}
      >
        {ui}
      </LocalStorageContext.Provider>
    </RecipeGalleryContext.Provider>
  );
}

describe("AddIngredientDialog", () => {
  it("adds an ingredient to the shopping list", async () => {
    renderWithContext(<AddIngredientDialog category="Vegetables" />);

    // Open the dialog
    fireEvent.click(screen.getByText("Add ingredient"));
    expect(await screen.findByText("Add ingredient:")).toBeInTheDocument();

    // Select ingredient
    const autocomplete = screen.getByRole("combobox");
    fireEvent.change(autocomplete, { target: { value: "Tomato" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });

    // Input quantity
    const quantityInput = screen.getByLabelText(/Quantity/i);
    fireEvent.change(quantityInput, { target: { value: "3" } });

    // Click Add
    fireEvent.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(mockUpdateShopList).toHaveBeenCalledWith([
        expect.objectContaining({
          name: "Tomato",
          quantity: 3,
          recipeName: "Custom added",
        }),
      ])
    );
  });
});
