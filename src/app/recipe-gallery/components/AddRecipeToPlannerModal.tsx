import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { MealType, Recipe } from "@/types";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddRecipeToPlannerModal({
  recipe,
}: {
  recipe: Recipe;
}) {
  const [open, setOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedMealIndex, setSelectedMealIndex] =
    useState<MealType>("breakfast");

  const { weekdays, updateMealPlan } = useMealPlannerContext();

  const handleSaveToPlan = () => {
    // todo: form validation
    if (selectedDayIndex === null) return;

    updateMealPlan({
      selectedDayIndex,
      selectedMealIndex,
      recipeId: recipe.id,
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ width: "100%" }}
      >
        Add to Plan
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>{`Add "${recipe.title}" to your week plan:`}</DialogTitle>
        <DialogContent>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel id="weekday-radio-group">
              <Typography sx={{ my: 2 }}>Select a day:</Typography>
            </FormLabel>
            <ButtonGroup
              variant="outlined"
              aria-label="weekday button group"
              sx={{ width: "100%" }}
            >
              {weekdays.map((day, index) => (
                <Button
                  sx={{ width: "100%" }}
                  key={day}
                  onClick={() => setSelectedDayIndex(index)}
                  color={selectedDayIndex === index ? "primary" : "secondary"}
                >
                  {day[0]}
                </Button>
              ))}
            </ButtonGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="meal-radio-group">
              <Typography sx={{ mt: 2 }}>Select meal slot:</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="meal-radio-group"
              name="meal-radio-group"
              value={selectedMealIndex}
              onChange={(_, value) => {
                setSelectedMealIndex(value as MealType);
              }}
            >
              {/* todo: leverage type */}
              {["breakfast", "lunch", "dinner"].map((meal) => (
                <FormControlLabel
                  key={meal}
                  control={<Radio />}
                  label={meal}
                  value={meal}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveToPlan}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
