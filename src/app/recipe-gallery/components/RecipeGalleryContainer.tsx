"use client";
import { Container, Typography, Grid } from "@mui/material";
import { RecipeCard } from "./RecipeCard";

export default function RecipeGalleryContainer() {
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
        {[...Array(20)].map((_, i) => (
          <Grid key={i} size={{ xs: 4, sm: 4, md: 4, lg: 3 }}>
            <RecipeCard
              key={i}
              image={
                "https://media.istockphoto.com/id/901354116/photo/traditional-italian-pasta-alla-norma-with-eggplant-tomato-cheese-and-basil.jpg?s=612x612&w=0&k=20&c=SIZvs4HVWT0ICi9-nP8w9TUhj3U8EksujdLyNUVpCY8="
              }
              title={"title"}
              cookingTime={"3min"}
              difficulty={"Easy"}
              dietaryTags={["alala", "css"]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
