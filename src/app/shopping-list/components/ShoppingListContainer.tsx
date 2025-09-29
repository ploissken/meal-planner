"use client";
import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { Container, Grid, Typography } from "@mui/material";
import CategoryList from "./CategoryList";

export default function ShoppingListContainer() {
  const { getIngredientCategories } = useMealPlannerContext();
  const categories = getIngredientCategories();

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Shopping List
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {categories.map((category) => (
          <CategoryList key={category} category={category} />
        ))}
      </Grid>
    </Container>
  );
}
