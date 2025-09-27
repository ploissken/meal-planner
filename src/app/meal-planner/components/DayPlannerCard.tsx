"use client";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import { MealType } from "@/types";
import { Card, CardContent, Chip, Grid, Typography } from "@mui/material";

export default function DayPlannerCard({
  weekday,
  plan,
}: {
  weekday: string;
  plan: Record<MealType, string | null>;
}) {
  const mealLabels: MealType[] = ["breakfast", "lunch", "dinner"];
  const { recipes } = useRecipeGalleryContext();

  const getRecipeChip = (meal: MealType) => {
    const recipeId = plan[meal];
    if (!recipeId) return null;

    const recipe = recipes.find((r) => r.id === `${recipeId}`);
    if (!recipe) return null;

    return (
      <Chip
        label={recipe.title}
        color="primary"
        variant="outlined"
        onClick={() => {}}
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
          },
        }}
      />
    );
  };

  return (
    <Card sx={{ borderRadius: "inherit" }}>
      <CardContent>
        <Grid container>
          <Grid sx={{ minHeight: "80px" }} size={{ xs: 6, md: 12 }}>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              {weekday}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 12 }}>
            {mealLabels.map((mealLabel) => (
              <Grid key={`${weekday}-${mealLabel}`}>
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
