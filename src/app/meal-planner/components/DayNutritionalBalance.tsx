import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import {
  GRAPH_COLORS,
  RECOMMENDED_CARB_DAILY_INTAKE,
  RECOMMENDED_FAT_DAILY_INTAKE,
  RECOMMENDED_PROTEIN_DAILY_INTAKE,
} from "@/consts";
import { MealType, NutritionalInfo } from "@/types";
import { PieChart } from "@mui/x-charts";

const PIE_CHART_HEIGHT = 170;

export default function DayNutritionalBalance({
  plan,
}: {
  plan: Record<MealType, string | null>;
}) {
  const { getRecipeById } = useRecipeGalleryContext();
  const dailyBalanceTotal = [
    getRecipeById(plan.breakfast),
    getRecipeById(plan.lunch),
    getRecipeById(plan.dinner),
  ]
    .map((meal) => meal?.nutritionalInfo)
    .reduce(
      (acc: NutritionalInfo, item) => {
        if (!item) return acc;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { protein: 0, carbs: 0, fat: 0 }
    );

  const dailyTotal = [
    { label: "Protein", value: dailyBalanceTotal.protein },
    { label: "Fat", value: dailyBalanceTotal.fat },
    { label: "Carbs", value: dailyBalanceTotal.carbs },
  ];

  const dailyRecomendation = [
    {
      label: "Daily recommended Protein",
      value: RECOMMENDED_PROTEIN_DAILY_INTAKE,
    },
    { label: "Daily recommended Fat", value: RECOMMENDED_FAT_DAILY_INTAKE },
    { label: "Daily recommended Carbs", value: RECOMMENDED_CARB_DAILY_INTAKE },
  ];

  return (
    <PieChart
      colors={GRAPH_COLORS}
      series={[
        {
          startAngle: -90,
          endAngle: 90,
          innerRadius: 0,
          outerRadius: 40,
          data: dailyTotal,
        },
        {
          startAngle: -90,
          endAngle: 90,
          innerRadius: 50,
          outerRadius: 60,
          data: dailyRecomendation,
        },
      ]}
      hideLegend
      height={PIE_CHART_HEIGHT}
    />
  );
}
