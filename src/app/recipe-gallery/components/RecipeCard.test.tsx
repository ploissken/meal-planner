// RecipeCard.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { RecipeCard } from "./RecipeCard";
import { Recipe } from "@/types";

// Mock dependencies to keep the test isolated
jest.mock("./AddRecipeToPlannerModal", () => ({
  __esModule: true,
  default: ({ recipe }: { recipe: Recipe }) => (
    <button data-testid="mock-add-to-planner">Add to planner</button>
  ),
}));

jest.mock("./RecipeDetailModal", () => ({
  __esModule: true,
  default: ({ recipe, trigger }: { recipe: Recipe; trigger: any }) =>
    trigger(() => {}),
}));

const mockRecipe: Recipe = {
  id: "1",
  title: "Test Recipe",
  image: "test-image.jpg",
  cookingTimeInMin: 30,
  difficulty: "Easy",
  dietaryTags: ["Vegan", "Gluten-Free"],
  ingredients: [],
  instructions: [],
  nutritionalInfo: {
    carbs: 10,
    protein: 5,
    fat: 2,
  },
  rating: {
    average: 4.5,
    votes: 10,
  },
  cuisine: "",
};

describe("RecipeCard", () => {
  it("renders recipe info correctly", () => {
    render(<RecipeCard recipe={mockRecipe} />);

    // Card basics
    expect(screen.getByTestId("recipe-card")).toBeInTheDocument();
    expect(screen.getByAltText("Test Recipe")).toHaveAttribute(
      "src",
      "test-image.jpg"
    );
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();

    // Cooking time + difficulty
    expect(screen.getByText(/30 min/i)).toBeInTheDocument();
    expect(screen.getByText(/Easy/i)).toBeInTheDocument();

    // Dietary tags
    expect(screen.getByText("Vegan")).toBeInTheDocument();
    expect(screen.getByText("Gluten-Free")).toBeInTheDocument();

    // Add to planner button mocked
    expect(screen.getByTestId("mock-add-to-planner")).toBeInTheDocument();

    // Details button from mocked RecipeDetailModal
    expect(
      screen.getByRole("button", { name: /details/i })
    ).toBeInTheDocument();
  });
});
