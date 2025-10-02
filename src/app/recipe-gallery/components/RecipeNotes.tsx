import { useMealPlannerContext } from "@/app/meal-planner/context/MealPlannerContext";
import { Recipe, RecipeNote } from "@/types";
import { Box, TextareaAutosize } from "@mui/material";
import { ChangeEvent } from "react";

export default function RecipeNotes({ recipe }: { recipe: Recipe }) {
  const { notes, updateNotes } = useMealPlannerContext();

  const currentNote =
    notes.find((note) => note.recipeId === recipe.id)?.note || "";

  const handleNoteUpdated = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const note: RecipeNote = {
      recipeId: recipe.id,
      note: evt.target.value,
    };
    updateNotes(note);
  };
  return (
    <Box sx={{ paddingTop: "8px" }}>
      <TextareaAutosize
        minRows={5}
        style={{ width: "100%" }}
        onChange={handleNoteUpdated}
        value={currentNote}
      />
    </Box>
  );
}
