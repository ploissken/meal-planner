import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import { MealType, NutritionalInfo } from "@/types";
import { PieChart } from "@mui/x-charts";

export default function DayNutritionalBalance({
  plan,
  weekday,
}: {
  plan: Record<MealType, string | null>;
  weekday: string;
}) {
  const { getRecipeById } = useRecipeGalleryContext();
  const dailyNutritionalBalanceTotal = [
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
    { label: "Protein", value: dailyNutritionalBalanceTotal.protein },
    { label: "Fat", value: dailyNutritionalBalanceTotal.fat },
    { label: "Carbs", value: dailyNutritionalBalanceTotal.carbs },
  ];

  const dailyRecomendation = [
    { label: "Daily recommended Protein", value: 50 },
    { label: "Daily recommended Fat", value: 44 },
    { label: "Daily recommended Carbs", value: 225 },
  ];

  return (
    <PieChart
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
      height={170}
    />
  );
}
