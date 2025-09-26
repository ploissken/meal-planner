"use client";
import { Container, Typography, Grid } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import { mockFetch } from "@/mockFetch";
import { useEffect, useState } from "react";
import mockRecipes from "../../../mock-data/recipes.json";
import { Recipe } from "@/types";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

export default function RecipeGalleryContainer() {
  // TODO: useContext
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockFetch<Array<Recipe>>(mockRecipes as Array<Recipe>, 1500).then(
      (data) => {
        console.log("fetched data", data);
        setRecipes(data);
        setLoading(false);
      }
    );
  }, []);

  return (
    <Container maxWidth="lg">
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
        {recipes.length > 0 &&
          [...Array(20)].map((_, i) => (
            <Grid key={i} size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
              <RecipeCard key={i} recipe={recipes?.[0]} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
