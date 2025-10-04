import { render, screen, fireEvent } from "@testing-library/react";
import DayPlannerCard from "./DayPlannerCard";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import { useLocalStorageContext } from "../../context/LocalStorageContext";

// Mock the RecipeDetailModal to just render the trigger function
jest.mock("@/app/recipe-gallery/components/RecipeDetailModal", () => ({
  __esModule: true,
  default: ({ trigger }: any) => trigger(() => {}),
}));

// Mock the hooks
jest.mock("@/app/recipe-gallery/context/RecipeGalleryContext", () => ({
  useRecipeGalleryContext: jest.fn(),
}));

jest.mock("../context/LocalStorageContext", () => ({
  useLocalStorageContext: jest.fn(),
}));

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

  beforeEach(() => {
    (useRecipeGalleryContext as jest.Mock).mockReturnValue({
      getRecipeById: (id: string | null) => (id ? mockRecipes[id] : undefined),
    });

    (useLocalStorageContext as jest.Mock).mockReturnValue({
      updateMealPlan,
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
    render(<DayPlannerCard weekday={weekday} plan={plan} />);
    expect(screen.getByText("Monday")).toBeInTheDocument();
  });

  it("renders meal labels and recipe chips", () => {
    render(<DayPlannerCard weekday={weekday} plan={plan} />);
    expect(screen.getByText("breakfast")).toBeInTheDocument();
    expect(screen.getByText("lunch")).toBeInTheDocument();
    expect(screen.getByText("dinner")).toBeInTheDocument();

    expect(screen.getByText("Pancakes")).toBeInTheDocument();
    expect(screen.getByText("Salad")).toBeInTheDocument();
  });

  it("calls updateMealPlan when a recipe chip is deleted", () => {
    render(<DayPlannerCard weekday={weekday} plan={plan} />);

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

    expect(updateMealPlan).toHaveBeenCalledWith({
      selectedDayIndex: 0,
      selectedMealIndex: "breakfast",
      recipeId: null,
    });
  });
});
