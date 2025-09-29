import { Recipe } from "@/types";
import { FormatListNumbered, MenuBook, PieChart } from "@mui/icons-material";
import {
  Button,
  Modal,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
// import { PieChart } from "@mui/x-charts/PieChart";
export default function RecipeDetailModal({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
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
            <img
              src={recipe.image}
              style={{ maxWidth: "500px", width: "100%" }}
            />
          </Box>
          {/* <Image
            src={recipe.image}
            alt="recipe image"
            width="100"
            height="100"
          /> */}

          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
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
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <FormatListNumbered />
            Instructions
          </Typography>
          <Divider />

          <List>
            {recipe.instructions.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <PieChart />
            Nutritional Info
          </Typography>
          <Divider />

          {JSON.stringify(recipe.nutritionalInfo)}
          {/* <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={200}
            height={200}
          /> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
