import { Recipe } from "@/types";
import { FormatListNumbered, MenuBook, PieChart } from "@mui/icons-material";
import {
  Button,
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
import { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import RecipeInstructionItem from "./RecipeInstructionItem";

export default function RecipeDetailModal({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const titleStyle = { display: "flex", alignItems: "center", gap: 2, mt: 4 };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ width: "100%" }}
      >
        Details
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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

          <Typography variant="h6" sx={titleStyle}>
            <PieChart />
            Nutritional Info
          </Typography>
          <Divider />

          <BarChart
            xAxis={[
              {
                data: ["protein", "carbs", "fat"],
              },
            ]}
            series={[
              {
                data: [
                  recipe.nutritionalInfo.protein,
                  recipe.nutritionalInfo.carbs,
                  recipe.nutritionalInfo.fat,
                ],
              },
            ]}
            height={250}
          />

          <Typography variant="h6" sx={titleStyle}>
            <MenuBook />
            Ingredients
          </Typography>
          <Divider />

          <List>
            {recipe.ingredients.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemText
                  primary={`${item.quantity} (units) ${item.name}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={titleStyle}>
            <FormatListNumbered />
            Instructions
          </Typography>
          <Divider />

          <List>
            {recipe.instructions.map((item) => (
              <RecipeInstructionItem key={item.label} instruction={item} />
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
