"use client";
import { useLocalStorageContext } from "@/app/context/LocalStorageContext";
import { Container, Grid, Typography } from "@mui/material";
import CategoryList from "./CategoryList";

export default function ShoppingListContainer() {
  const { getIngredientCategories, shoplist } = useLocalStorageContext();
  const categories = getIngredientCategories();
  const totalEstimated = shoplist
    .reduce((a, c) => (a += c.estimatedCostPerUnit * c.quantity), 0)
    .toFixed(2);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography variant="h4">Shopping List</Typography>
      <Typography variant="h6" sx={{ mb: 2 }} color="secondary">
        Estimated total cost: $ {totalEstimated}
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {categories.map((category) => (
          <CategoryList key={category} category={category} />
        ))}
      </Grid>
    </Container>
  );
}
