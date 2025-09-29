"use client";
import { Container, Typography, Grid } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import RecipeCardSkeleton from "./RecipeCardSkeleton";
import { useRecipeGalleryContext } from "../context/RecipeGalleryContext";

export default function RecipeGalleryContainer() {
  const { loading, recipes } = useRecipeGalleryContext();
  console.log("recipes", recipes);
  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Recipe Gallery
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading &&
          [...Array(20)].map((_, i) => (
            <Grid key={i} size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
              <RecipeCardSkeleton />
            </Grid>
          ))}
        {recipes.map((recipe) => (
          <Grid key={recipe.id} size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
