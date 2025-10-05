import { render, screen, fireEvent } from "@testing-library/react";
import RecipeNotes from "./RecipeNotes";
import {
  LocalStorageContext,
  LocalStorageContextType,
} from "@/app/context/LocalStorageContext";
import { Recipe } from "@/types";

describe("RecipeNotes", () => {
  const mockUpdateNotes = jest.fn();
  const mockContextValue: LocalStorageContextType = {
    ingredients: [],
    shoplist: [],
    updateShopList: jest.fn(),
    mealPlan: [],
    weekdays: [],
    notes: [{ recipeId: "r1", note: "Initial note" }],
    updateMealPlan: jest.fn(),
    getIngredientCategories: jest.fn(),
    updateNotes: mockUpdateNotes,
  };
  const mockRecipe: Recipe = {
    id: "r1",
    title: "Test Recipe",
    ingredients: [],
    instructions: [],
    rating: { average: 0, votes: 0 },
    dietaryTags: [],
    cuisine: "",
    cookingTimeInMin: 0,
    nutritionalInfo: { protein: 0, fat: 0, carbs: 0 },
    image: "",
    difficulty: "Easy",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea with current note", () => {
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <RecipeNotes recipe={mockRecipe} />
      </LocalStorageContext.Provider>
    );
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial note");
  });

  it("calls updateNotes when textarea content changes", () => {
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <RecipeNotes recipe={mockRecipe} />
      </LocalStorageContext.Provider>
    );
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Updated note" } });

    expect(mockUpdateNotes).toHaveBeenCalledWith({
      recipeId: "r1",
      note: "Updated note",
    });
  });
});
