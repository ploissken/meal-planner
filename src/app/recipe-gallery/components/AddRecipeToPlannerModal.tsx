import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { MealType, Recipe } from "@/types";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
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
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>();
  const [selectedMealIndex, setSelectedMealIndex] =
    useState<MealType>("breakfast");

  const { weekdays, updateMealPlan } = useMealPlannerContext();

  const handleSaveToPlan = () => {
    // todo: form validation
    if (!selectedDayIndex) return;

    updateMealPlan({
      selectedDayIndex,
      selectedMealIndex,
      recipeId: recipe.id,
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => setOpen(true)}
      >
        Add to Meal Planner
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid
          sx={{
            // todo: fix this
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            gap: 8,
          }}
        >
          <Typography variant="h6" component="h2">
            {`Add "${recipe.title}" to your week plan:`}
          </Typography>
          <Typography sx={{ mt: 2 }}>Select a day:</Typography>
          <ButtonGroup variant="outlined" aria-label="weekday button group">
            {weekdays.map((day, index) => (
              <Button
                key={day}
                onClick={() => setSelectedDayIndex(index)}
                color={selectedDayIndex === index ? "primary" : "secondary"}
              >
                {day[0]}
              </Button>
            ))}
          </ButtonGroup>
          <Typography sx={{ mt: 2 }}>And the meal slot:</Typography>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedMealIndex}
              onChange={(_, value) => {
                setSelectedMealIndex(value);
              }}
            >
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
          <Button fullWidth variant="contained" onClick={handleSaveToPlan}>
            Save
          </Button>
        </Grid>
      </Modal>
    </>
  );
}
