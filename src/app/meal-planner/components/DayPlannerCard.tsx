"use client";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import { MealType } from "@/types";
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import DayNutritionalBalance from "./DayNutritionalBalance";
import RecipeDetailModal from "@/app/recipe-gallery/components/RecipeDetailModal";
import { useMealPlannerContext } from "../context/MealPlannerContext";

export default function DayPlannerCard({
  weekday,
  plan,
}: {
  weekday: { name: string; index: number };
  plan: Record<MealType, string | null>;
}) {
  const mealLabels: MealType[] = ["breakfast", "lunch", "dinner"];
  const { getRecipeById } = useRecipeGalleryContext();
  const { updateMealPlan } = useMealPlannerContext();

  const handleDeleteRecipe = (meal: MealType) => {
    updateMealPlan({
      selectedDayIndex: weekday.index,
      selectedMealIndex: meal,
      recipeId: null,
    });
  };

  const getRecipeChip = (meal: MealType) => {
    const recipe = getRecipeById(plan[meal]);
    if (!recipe) return null;

    return (
      <RecipeDetailModal
        recipe={recipe}
        trigger={(openDialog) => (
          <Chip
            label={recipe.title}
            color="primary"
            variant="outlined"
            onClick={openDialog}
            onDelete={() => handleDeleteRecipe(meal)}
            sx={{
              height: "auto",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <Card sx={{ borderRadius: "inherit" }}>
      <CardContent>
        <Grid container>
          <Grid sx={{ minHeight: "80px" }} size={{ xs: 6, lg: 12 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              {weekday.name}
            </Typography>
            <DayNutritionalBalance plan={plan} />
          </Grid>
          <Grid size={{ xs: 6, lg: 12 }}>
            {mealLabels.map((mealLabel) => (
              <Grid key={`${weekday.name}-${mealLabel}`}>
                <Typography gutterBottom sx={{ fontSize: 14 }}>
                  {mealLabel}
                </Typography>
                {getRecipeChip(mealLabel)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
