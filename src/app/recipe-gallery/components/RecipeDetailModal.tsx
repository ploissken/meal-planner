import { Recipe } from "@/types";
import { PieChart } from "@mui/icons-material";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import RecipeInstructionItem from "./RecipeInstructionItem";
import RecipeRating from "./RecipeRating";
import RecipeNotes from "./RecipeNotes";
import { GRAPH_COLORS } from "@/consts";

export default function RecipeDetailModal({
  recipe,
  trigger,
}: {
  recipe: Recipe;
  trigger: (openDialog: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {
    nutritionalInfo: { carbs, protein, fat },
  } = recipe;

  const buildSectionTitle = (title: string) => {
    return (
      <>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 2, mt: 4 }}
        >
          <PieChart />
          {title}
        </Typography>
        <Divider />
      </>
    );
  };

  return (
    <>
      {trigger(() => setOpen(true))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{recipe.title}</DialogTitle>

        <DialogContent dividers>
          <Box>
            {/* avoiding next/image for config simplicity */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={recipe.image}
              style={{ maxWidth: "500px", width: "100%" }}
              alt={recipe.title}
            />
          </Box>

          {buildSectionTitle("Nutritional Info")}
          <BarChart
            colors={GRAPH_COLORS}
            xAxis={[
              {
                data: ["protein", "carbs", "fat"],
              },
            ]}
            series={[
              {
                data: [protein, carbs, fat],
              },
            ]}
            height={250}
          />

          {buildSectionTitle("Rating")}
          <RecipeRating recipe={recipe} />

          {buildSectionTitle("Ingredients")}
          <List>
            {recipe.ingredients.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemText
                  primary={`${item.quantity} (units) ${item.name}`}
                />
              </ListItem>
            ))}
          </List>

          {buildSectionTitle("Instructions")}
          <List>
            {recipe.instructions.map((item) => (
              <RecipeInstructionItem key={item.label} instruction={item} />
            ))}
          </List>

          {buildSectionTitle("Personal Notes")}
          <RecipeNotes recipe={recipe} />
        </DialogContent>
      </Dialog>
    </>
  );
}
