import { render, screen, waitFor } from "@testing-library/react";
import RecipeGalleryContainer from "./RecipeGalleryContainer";
import {
  RecipeGalleryContext,
  RecipeGalleryContextType,
} from "../context/RecipeGalleryContext";
import { Recipe } from "@/types";
import { LocalStorageProvider } from "@/app/context/LocalStorageContext";

// --- Mock test data ---
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mock Lasagna",
    cuisine: "Italian",
    dietaryTags: ["vegetarian"],
    cookingTimeInMin: 40,
    ingredients: [
      {
        name: "pasta",
        id: "2",
        quantity: 0,
      },
    ],
    rating: { average: 4.8, votes: 12 },
    instructions: [],
    image: "",
    difficulty: "Easy",
    nutritionalInfo: {
      protein: 0,
      carbs: 10,
      fat: 10,
    },
  },
  {
    id: "2",
    title: "Mock Tacos",
    cuisine: "Mexican",
    dietaryTags: ["gluten-free"],
    cookingTimeInMin: 25,
    ingredients: [
      {
        id: "1",
        name: "tortilla",
        quantity: 1,
      },
    ],
    rating: { average: 4.2, votes: 8 },
    instructions: [],
    image: "",
    difficulty: "Easy",
    nutritionalInfo: {
      protein: 10,
      carbs: 10,
      fat: 10,
    },
  },
];

export const baseContextValue: RecipeGalleryContextType = {
  cuisines: [],
  restrictions: [],
  selectedCuisines: [],
  setSelectedCuisines: jest.fn(),
  maxCookingTime: 0,
  maxCookingTimeFromRecipe: 60,
  setMaxCookingTime: jest.fn(),
  selectedRestrictions: [],
  setSelectedRestrictions: jest.fn(),
  resetFilters: jest.fn(),
  searchInput: "",
  setSearchInput: jest.fn(),
  getRecipeById: (id: string | null) => mockRecipes.find((r) => r.id === id),
  recipes: [],
  loading: false,
};

function renderWithContexts(
  contextOverrides: Partial<RecipeGalleryContextType>
) {
  const contextValue: RecipeGalleryContextType = {
    ...baseContextValue,
    ...contextOverrides,
  };

  return render(
    <RecipeGalleryContext.Provider value={contextValue}>
      <LocalStorageProvider>
        <RecipeGalleryContainer />
      </LocalStorageProvider>
    </RecipeGalleryContext.Provider>
  );
}

describe("RecipeGalleryContainer", () => {
  it("renders skeletons when loading", () => {
    renderWithContexts({ loading: true, recipes: [] });

    const skeletons = screen.getAllByTestId("recipe-card-skeleton");
    expect(skeletons).toHaveLength(20); // based on SKELETONS_QUANTITY
  });

  it("renders recipes after loading", async () => {
    renderWithContexts({ loading: false, recipes: mockRecipes });

    await waitFor(() => {
      expect(screen.getByText("Mock Lasagna")).toBeInTheDocument();
      expect(screen.getByText("Mock Tacos")).toBeInTheDocument();
    });

    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(2);
  });
});
