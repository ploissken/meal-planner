import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import SearchInput from "./SearchInput";
import { RecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";

// Create a mock context provider
const mockSetSearchInput = jest.fn();

function renderWithContext() {
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
        setSearchInput: mockSetSearchInput,
        resetFilters: jest.fn(),
        getRecipeById: () => undefined,
      }}
    >
      <SearchInput />
    </RecipeGalleryContext.Provider>
  );
}

describe("SearchInput", () => {
  it("renders the input and updates context on change", () => {
    renderWithContext();

    const input = screen.getByLabelText(/Search by title or ingredient/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "pasta" } });

    expect(mockSetSearchInput).toHaveBeenCalledWith("pasta");
  });
});
