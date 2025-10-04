import { render, screen, fireEvent } from "@testing-library/react";
import RecipeNotes from "./RecipeNotes";
import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { Recipe } from "@/types";

// Mock the MealPlannerContext hook
jest.mock("@/app/meal-planner/context/MealPlannerContext");

describe("RecipeNotes", () => {
  const mockUpdateNotes = jest.fn();

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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useMealPlannerContext as jest.Mock).mockReturnValue({
      notes: [{ recipeId: "r1", note: "Initial note" }],
      updateNotes: mockUpdateNotes,
    });
  });

  it("renders textarea with current note", () => {
    render(<RecipeNotes recipe={mockRecipe} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial note");
  });

  it("calls updateNotes when textarea content changes", () => {
    render(<RecipeNotes recipe={mockRecipe} />);
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Updated note" } });

    expect(mockUpdateNotes).toHaveBeenCalledWith({
      recipeId: "r1",
      note: "Updated note",
    });
  });
});
