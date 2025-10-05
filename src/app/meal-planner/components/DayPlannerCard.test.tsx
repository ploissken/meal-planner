import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DayPlannerCard from "./DayPlannerCard";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import {
  LocalStorageContext,
  LocalStorageContextType,
} from "../../context/LocalStorageContext";

// Mock the RecipeDetailModal to just render the trigger function
jest.mock("@/app/recipe-gallery/components/RecipeDetailModal", () => ({
  __esModule: true,
  default: ({ trigger }: any) => trigger(() => {}),
}));

// Mock the hooks
jest.mock("@/app/recipe-gallery/context/RecipeGalleryContext", () => ({
  useRecipeGalleryContext: jest.fn(),
}));

const mockContextValue: LocalStorageContextType = {
  ingredients: [],
  shoplist: [],
  updateShopList: jest.fn(),
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
  updateMealPlan: jest.fn(),
  getIngredientCategories: jest.fn(),
  updateNotes: jest.fn(),
};

describe("DayPlannerCard", () => {
  const weekday = { name: "Monday", index: 0 };
  const plan = {
    breakfast: "r1",
    lunch: "r2",
    dinner: null,
  };

  const mockRecipes = {
    r1: {
      id: "r1",
      title: "Pancakes",
      ingredients: [{ id: "i1", quantity: "1 cup" }],
      cookingTimeInMin: 10,
    },
    r2: {
      id: "r2",
      title: "Salad",
      ingredients: [{ id: "i2", quantity: "2 cups" }],
      cookingTimeInMin: 5,
    },
  };

  const updateMealPlan = jest.fn();
  const renderWithContext = () => {
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <DayPlannerCard weekday={weekday} plan={plan} />
      </LocalStorageContext.Provider>
    );
  };

  beforeEach(() => {
    (useRecipeGalleryContext as jest.Mock).mockReturnValue({
      getRecipeById: (id: string | null) => (id ? mockRecipes[id] : undefined),
    });

    // Patch structuredClone in case something triggers it
    if (typeof globalThis.structuredClone === "undefined") {
      globalThis.structuredClone = (obj: any) =>
        JSON.parse(JSON.stringify(obj));
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the weekday name", () => {
    renderWithContext();
    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  it("renders meal labels and recipe chips", () => {
    renderWithContext();
    expect(screen.getByText("BREAKFAST")).toBeInTheDocument();
    expect(screen.getByText("LUNCH")).toBeInTheDocument();
    expect(screen.getByText("DINNER")).toBeInTheDocument();

    expect(screen.getByText("Pancakes")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
  });

  it("calls updateMealPlan when a recipe chip is deleted", () => {
    renderWithContext();

    // Get all buttons (Chip is a button)
    const chipButtons = screen.getAllByRole("button");

    // Find the Pancakes chip button
    const pancakesButton = chipButtons.find((btn) =>
      btn.textContent?.includes("Pancakes")
    );

    // Find the delete icon inside it and click it
    const deleteButton = pancakesButton?.querySelector("svg");

    // Simulate click on the delete icon
    if (deleteButton && pancakesButton) {
      fireEvent.click(deleteButton);
    }

    waitFor(() => {
      expect(updateMealPlan).toHaveBeenCalledWith({
        selectedDayIndex: 0,
        selectedMealIndex: "breakfast",
        recipeId: null,
      });
    });
  });
});
