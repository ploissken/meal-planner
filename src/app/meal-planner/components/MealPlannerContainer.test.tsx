import { render, screen } from "@testing-library/react";
import { useMealPlannerContext } from "../context/MealPlannerContext";
import MealPlannerContainer from "./MealPlannerContainer";

// Mock DayPlannerCard so we can spy on its props
jest.mock("./DayPlannerCard", () => {
  return jest.fn(({ weekday, plan }) => (
    <div data-testid="day-card">
      {weekday.name} - {plan}
    </div>
  ));
});

jest.mock("../context/MealPlannerContext", () => ({
  useMealPlannerContext: jest.fn(),
}));

describe("MealPlannerContainer", () => {
  const mockWeekdays = ["Monday", "Tuesday", "Wednesday"];
  const mockMealPlan = ["Meal A", "Meal B", "Meal C"];

  beforeEach(() => {
    (useMealPlannerContext as jest.Mock).mockReturnValue({
      weekdays: mockWeekdays,
      mealPlan: mockMealPlan,
    });
  });

  it("renders the meal planner title", () => {
    render(<MealPlannerContainer />);
    expect(screen.getByText("Weekly Meal Planner")).toBeInTheDocument();
  });

  it("renders a DayPlannerCard for each weekday", () => {
    render(<MealPlannerContainer />);
    const cards = screen.getAllByTestId("day-card");
    expect(cards).toHaveLength(mockWeekdays.length);

    // Optionally verify text content for each card
    mockWeekdays.forEach((day, idx) => {
      expect(
        screen.getByText(`${day} - ${mockMealPlan[idx]}`)
      ).toBeInTheDocument();
    });
  });
});
