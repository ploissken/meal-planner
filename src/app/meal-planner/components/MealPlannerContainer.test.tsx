import { render, screen } from "@testing-library/react";
import { useLocalStorageContext } from "../../context/LocalStorageContext";
import LocalStorageContainer from "./LocalStorageContainer";

// Mock DayPlannerCard so we can spy on its props
jest.mock("./DayPlannerCard", () => {
  return jest.fn(({ weekday, plan }) => (
    <div data-testid="day-card">
      {weekday.name} - {plan}
    </div>
  ));
});

jest.mock("../context/LocalStorageContext", () => ({
  useLocalStorageContext: jest.fn(),
}));

describe("LocalStorageContainer", () => {
  const mockWeekdays = ["Monday", "Tuesday", "Wednesday"];
  const mockMealPlan = ["Meal A", "Meal B", "Meal C"];

  beforeEach(() => {
    (useLocalStorageContext as jest.Mock).mockReturnValue({
      weekdays: mockWeekdays,
      mealPlan: mockMealPlan,
    });
  });

  it("renders the meal planner title", () => {
    render(<LocalStorageContainer />);
    expect(screen.getByText("Weekly Meal Planner")).toBeInTheDocument();
  });

  it("renders a DayPlannerCard for each weekday", () => {
    render(<LocalStorageContainer />);
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
