import { render, screen, fireEvent } from "@testing-library/react";
import AddRecipeToPlannerModal from "./AddRecipeToPlannerModal";
import {
  LocalStorageContext,
  LocalStorageContextType,
} from "@/app/context/LocalStorageContext";
import { Recipe } from "@/types";

const mockUpdateShopList = jest.fn();
const mockUpdateMealPlan = jest.fn();

const mockContextValue: LocalStorageContextType = {
  ingredients: [],
  shoplist: [],
  updateShopList: mockUpdateShopList,
  mealPlan: [],
  weekdays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  notes: [],
  updateMealPlan: mockUpdateMealPlan,
  getIngredientCategories: jest.fn(),
  updateNotes: jest.fn(),
};

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
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <AddRecipeToPlannerModal recipe={mockRecipe} />
      </LocalStorageContext.Provider>
    );

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
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <AddRecipeToPlannerModal recipe={mockRecipe} />
      </LocalStorageContext.Provider>
    );

    // Open modal
    fireEvent.click(screen.getByRole("button", { name: /add to plan/i }));

    // Click save directly without selecting a day
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(mockUpdateMealPlan).not.toHaveBeenCalled();
  });
});
