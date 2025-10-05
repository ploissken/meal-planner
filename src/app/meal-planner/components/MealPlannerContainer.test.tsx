import { render, screen } from "@testing-library/react";
import {
  LocalStorageContext,
  LocalStorageContextType,
} from "@/app/context/LocalStorageContext";
import MealPlannerContainer from "./MealPlannerContainer";

// Mock DayPlannerCard so we can spy on its props
jest.mock("./DayPlannerCard", () => {
  return jest.fn(({ weekday, plan }) => (
    <div data-testid="day-card">
      {weekday.name} - {plan}
    </div>
  ));
});
const mockWeekdays = ["Monday", "Tuesday", "Wednesday"];
const mockContextValue: LocalStorageContextType = {
  ingredients: [],
  shoplist: [],
  updateShopList: jest.fn(),
  mealPlan: [],
  weekdays: mockWeekdays,
  notes: [],
  updateMealPlan: jest.fn(),
  getIngredientCategories: jest.fn(),
  updateNotes: jest.fn(),
};

describe("MealPlannerContainer", () => {
  it("renders the meal planner title", () => {
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <MealPlannerContainer />
      </LocalStorageContext.Provider>
    );
    expect(screen.getByText("Weekly Meal Planner")).toBeInTheDocument();
  });

  it("renders a DayPlannerCard for each weekday", () => {
    render(
      <LocalStorageContext.Provider value={mockContextValue}>
        <MealPlannerContainer />
      </LocalStorageContext.Provider>
    );
    const cards = screen.getAllByTestId("day-card");
    expect(cards).toHaveLength(mockWeekdays.length);
  });
});
