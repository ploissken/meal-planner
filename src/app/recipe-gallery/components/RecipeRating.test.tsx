import { render, screen, fireEvent } from "@testing-library/react";
import RecipeRating from "./RecipeRating";
import { Recipe } from "@/types";

// 🧪 Mock MUI icons to visible spans for testing
jest.mock("@mui/icons-material", () => ({
  Star: (props: any) => (
    <span onClick={props.onClick} data-testid="star">
      ★
    </span>
  ),
  StarHalf: (props: any) => (
    <span onClick={props.onClick} data-testid="star-half">
      ☆½
    </span>
  ),
  StarOutline: (props: any) => (
    <span onClick={props.onClick} data-testid="star-outline">
      ☆
    </span>
  ),
}));

describe("RecipeRating", () => {
  const mockRecipe: Recipe = {
    id: "test-1",
    title: "Test Recipe",
    ingredients: [],
    instructions: [],
    rating: { average: 3.5, votes: 4 },
    dietaryTags: [],
    cuisine: "test",
    cookingTimeInMin: 0,
    nutritionalInfo: {
      protein: 0,
      fat: 0,
      carbs: 0,
    },
    image: "",
    difficulty: "Easy",
  };

  it("renders correct number of stars based on average rating", () => {
    render(<RecipeRating recipe={mockRecipe} />);

    expect(screen.getAllByTestId("star")).toHaveLength(3); // full stars
    expect(screen.getAllByTestId("star-half")).toHaveLength(1); // half star
    expect(screen.getAllByTestId("star-outline")).toHaveLength(1); // empty star

    expect(screen.getByText("3.5 (4 votes)")).toBeInTheDocument();
  });

  it("updates rating after user clicks a star", () => {
    render(<RecipeRating recipe={mockRecipe} />);

    const outlineStars = screen.getAllByTestId("star-outline");
    fireEvent.click(outlineStars[0]); // Clicks to give a 5-star rating

    const expectedNewAverage = ((3.5 * 4 + 5) / 5).toFixed(2);

    expect(
      screen.getByText(`${expectedNewAverage} (5 votes)`)
    ).toBeInTheDocument();
  });

  it("does not update rating on second click", () => {
    render(<RecipeRating recipe={mockRecipe} />);

    const stars = screen.getAllByTestId("star");
    fireEvent.click(stars[1]); // Clicks to give a 2-star rating

    const firstExpectedAvg = ((3.5 * 4 + 2) / 5).toFixed(2);
    expect(
      screen.getByText(`${firstExpectedAvg} (5 votes)`)
    ).toBeInTheDocument();

    // Try clicking another star
    const outlineStars = screen.getAllByTestId("star-outline");
    fireEvent.click(outlineStars[0]); // Should be ignored

    // Still the same result
    expect(
      screen.getByText(`${firstExpectedAvg} (5 votes)`)
    ).toBeInTheDocument();
  });
});
