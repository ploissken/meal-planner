import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { FullRecipeIngredient } from "@/types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  ListItem,
  ListItemButton,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function AddIngredientDialog({
  category,
}: {
  category: string;
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<{
    label: string;
    id: string;
  } | null>(null);
  const { ingredients, shoplist, updateShopList } = useMealPlannerContext();
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.category === category
  );
  const quantityLabel = selectedIngredient
    ? `Quantity (${
        ingredients.find(({ id }) => id === selectedIngredient.id)?.unit
      }s)`
    : "Quantity";

  const handleAddIngredient = () => {
    const ingredient = ingredients.find(
      ({ id }) => id === selectedIngredient?.id
    );
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    const newItem: FullRecipeIngredient = {
      ...ingredient,
      recipeName: "Custom added",
      quantity: parseInt(quantity),
    };

    updateShopList([...shoplist, newItem]);
    setOpen(false);
  };

  return (
    <>
      <ListItemButton
        onClick={() => setOpen(true)}
        sx={(theme) => ({
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          marginTop: "16px",
        })}
      >
        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <Typography color="primary">Add ingredient</Typography>
        </ListItem>
      </ListItemButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Add ingredient:`}</DialogTitle>
        <DialogContent>
          <Stack direction="row" gap={2} sx={{ m: 4 }}>
            <Autocomplete
              options={filteredIngredients.map(({ name, id }) => ({
                label: name,
                id,
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Ingredient" />
              )}
              value={selectedIngredient}
              onChange={(_, value) => setSelectedIngredient(value)}
            />
            <TextField
              label={quantityLabel}
              variant="outlined"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAddIngredient}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
