import { render, screen, fireEvent } from "@testing-library/react";
import AddRecipeToPlannerModal from "./AddRecipeToPlannerModal";
import { Recipe } from "@/types";
import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";

// Mock the context
jest.mock("@/app/meal-planner/context/MealPlannerContext");

const mockUpdateMealPlan = jest.fn();

const mockContext = {
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  updateMealPlan: mockUpdateMealPlan,
};

(useMealPlannerContext as jest.Mock).mockReturnValue(mockContext);

const mockRecipe: Recipe = {
  id: "recipe-123",
  title: "Delicious Salad",
  image: "/salad.jpg",
  difficulty: "Easy",
  cookingTimeInMin: 15,
  dietaryTags: ["Vegan", "Gluten-Free"],
  ingredients: [],
  instructions: [],
  nutritionalInfo: { carbs: 10, fat: 5, protein: 8 },
  rating: { average: 4.5, votes: 20 },
  cuisine: "mediterran",
};

describe("AddRecipeToPlannerModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens modal and allows selecting day and meal, then saves", () => {
    render(<AddRecipeToPlannerModal recipe={mockRecipe} />);

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /add to plan/i }));

    // Modal title
    expect(
      screen.getByText(/add "delicious salad" to your week plan/i)
    ).toBeInTheDocument();

    // Select day (e.g., Monday)
    const mondayButton = screen.getByRole("button", { name: "M" });
    fireEvent.click(mondayButton);

    // Select meal (e.g., lunch)
    const lunchRadio = screen.getByRole("radio", { name: /lunch/i });
    fireEvent.click(lunchRadio);

    // Click save
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockUpdateMealPlan).toHaveBeenCalledWith({
      selectedDayIndex: 0,
      selectedMealIndex: "lunch",
      recipeId: "recipe-123",
    });
  });

  it("does not call updateMealPlan if no day is selected", () => {
    render(<AddRecipeToPlannerModal recipe={mockRecipe} />);

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /add to plan/i }));

    // Click save directly without selecting a day
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockUpdateMealPlan).not.toHaveBeenCalled();
  });
});
