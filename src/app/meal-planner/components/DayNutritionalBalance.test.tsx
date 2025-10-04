import { render, screen } from "@testing-library/react";
import DayNutritionalBalance from "./DayNutritionalBalance";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import {
  RECOMMENDED_CARB_DAILY_INTAKE,
  RECOMMENDED_FAT_DAILY_INTAKE,
  RECOMMENDED_PROTEIN_DAILY_INTAKE,
} from "@/consts";

// Mock MUI PieChart to observe props
jest.mock("@mui/x-charts", () => ({
  PieChart: (props: any) => {
    return <div data-testid="pie-chart" data-props={JSON.stringify(props)} />;
  },
}));

jest.mock("@/app/recipe-gallery/context/RecipeGalleryContext", () => ({
  useRecipeGalleryContext: jest.fn(),
}));

describe("DayNutritionalBalance", () => {
  const mockGetRecipeById = jest.fn();

  beforeEach(() => {
    (useRecipeGalleryContext as jest.Mock).mockReturnValue({
      getRecipeById: mockGetRecipeById,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders PieChart with correct daily totals and recommendations", () => {
    const plan = {
      breakfast: "r1",
      lunch: "r2",
      dinner: "r3",
    };

    // Mock 3 recipes with known nutritional info
    mockGetRecipeById.mockImplementation((id: string | null) => {
      switch (id) {
        case "r1":
          return { nutritionalInfo: { protein: 10, fat: 5, carbs: 20 } };
        case "r2":
          return { nutritionalInfo: { protein: 15, fat: 10, carbs: 30 } };
        case "r3":
          return { nutritionalInfo: { protein: 5, fat: 5, carbs: 10 } };
        default:
          return undefined;
      }
    });

    render(<DayNutritionalBalance plan={plan} />);

    const chart = screen.getByTestId("pie-chart");

    const props = JSON.parse(chart.getAttribute("data-props") || "{}");

    const { series } = props;

    // Expect 2 data series: daily totals and recommendations
    expect(series).toHaveLength(2);

    // Daily totals should sum protein: 30, fat: 20, carbs: 60
    expect(series[0].data).toEqual([
      { label: "Protein", value: 30 },
      { label: "Fat", value: 20 },
      { label: "Carbs", value: 60 },
    ]);

    // Recommendations should be equal to the constants
    expect(series[1].data).toEqual([
      {
        label: "Daily recommended Protein",
        value: RECOMMENDED_PROTEIN_DAILY_INTAKE,
      },
      { label: "Daily recommended Fat", value: RECOMMENDED_FAT_DAILY_INTAKE },
      {
        label: "Daily recommended Carbs",
        value: RECOMMENDED_CARB_DAILY_INTAKE,
      },
    ]);
  });

  it("handles missing meals gracefully", () => {
    const plan = {
      breakfast: "r1",
      lunch: null,
      dinner: null,
    };

    mockGetRecipeById.mockReturnValueOnce({
      nutritionalInfo: { protein: 10, fat: 5, carbs: 25 },
    });

    render(<DayNutritionalBalance plan={plan} />);

    const chart = screen.getByTestId("pie-chart");
    const props = JSON.parse(chart.getAttribute("data-props") || "{}");

    expect(props.series[0].data).toEqual([
      { label: "Protein", value: 10 },
      { label: "Fat", value: 5 },
      { label: "Carbs", value: 25 },
    ]);
  });
});
