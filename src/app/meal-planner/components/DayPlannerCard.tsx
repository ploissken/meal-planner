"use client";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import { MealType } from "@/types";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import DayNutritionalBalance from "./DayNutritionalBalance";
import RecipeDetailModal from "@/app/recipe-gallery/components/RecipeDetailModal";
import { useLocalStorageContext } from "../../context/LocalStorageContext";

export default function DayPlannerCard({
  weekday,
  plan,
}: {
  weekday: { name: string; index: number };
  plan: Record<MealType, string | null>;
}) {
  const mealLabels: MealType[] = ["breakfast", "lunch", "dinner"];
  const { getRecipeById } = useRecipeGalleryContext();
  const { updateMealPlan } = useLocalStorageContext();

  const handleDeleteRecipe = (meal: MealType) => {
    updateMealPlan({
      selectedDayIndex: weekday.index,
      selectedMealIndex: meal,
      recipeId: null,
    });
  };

  const getRecipeChip = (meal: MealType) => {
    const recipe = getRecipeById(plan[meal]);
    if (!recipe) {
      return <Box sx={{ height: "60px" }} />;
    }

    return (
      <RecipeDetailModal
        recipe={recipe}
        trigger={(openDialog) => (
          <Chip
            label={recipe.title}
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
            <Typography
              sx={{ color: "text.secondary", fontSize: 14 }}
              align="center"
            >
              {weekday.name}
            </Typography>
            <DayNutritionalBalance plan={plan} />
          </Grid>
          <Grid size={{ xs: 6, lg: 12 }}>
            {mealLabels.map((mealLabel) => (
              <Grid key={`${weekday.name}-${mealLabel}`}>
                <Typography gutterBottom sx={{ fontSize: 14 }} color="primary">
                  {mealLabel.toUpperCase()}
                </Typography>
                <Box sx={{ height: { xs: "40px", lg: "60px" } }}>
                  {getRecipeChip(mealLabel)}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
