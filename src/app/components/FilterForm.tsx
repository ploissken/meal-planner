import {
  Box,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Multiselect from "./Multiselect";
import { useRecipeGalleryContext } from "../recipe-gallery/context/RecipeGalleryContext";

const COOKING_TIME_OFF_LABEL = "off";

export default function FilterForm() {
  const { recipes } = useRecipeGalleryContext();
  const [maxCookingTime, setMaxCookingTime] = useState(0);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(
    []
  );
  const cuisines = [...new Set(recipes.map(({ cuisine }) => cuisine))];
  const restrictions = [
    ...new Set(recipes.flatMap(({ dietaryTags }) => dietaryTags)),
  ];
  const maxCookingTimeRecipe = Math.max(
    ...recipes.map(({ cookingTimeInMin }) => cookingTimeInMin)
  );

  const handleMultiselectChange = (
    event: SelectChangeEvent<string[]>,
    id: string
  ) => {
    const {
      target: { value },
    } = event;

    const selectedValuesArray = // fixes type, mui's multiselect typing isn't perfect
      typeof value === "string" ? value.split(",") : value;

    if (id === "cuisines") {
      setSelectedCuisines(selectedValuesArray);
    } else {
      setSelectedRestrictions(selectedValuesArray);
    }
  };

  const handleCookingTimeChange = (event: Event, value: number) => {
    console.log(value);
    setMaxCookingTime(value);
  };

  const cookingTimeLabel =
    maxCookingTime === 0 ? COOKING_TIME_OFF_LABEL : `${maxCookingTime}mins`;

  return (
    <>
      <Stack sx={{ m: 2, gap: 2 }}>
        <Typography variant="h5" gutterBottom>
          Filter recipe by
        </Typography>
        <Multiselect
          value={selectedCuisines}
          handleChange={(evt) => handleMultiselectChange(evt, "cuisines")}
          options={cuisines}
          id="cuisines"
          label="Cuisine"
        />
        <Multiselect
          value={selectedRestrictions}
          handleChange={(evt) => handleMultiselectChange(evt, "restrictions")}
          options={restrictions}
          id="restrictions"
          label="Dietary Restrictions"
        />
        {/* todo: fix design, this label may be bad for screen readears */}
        <Typography id="cooking-time-slider" gutterBottom>
          Max cooking time {`(${cookingTimeLabel})`}
        </Typography>
        <Box sx={{ mx: 2 }}>
          <Slider
            aria-labelledby="cooking-time-slider"
            valueLabelDisplay="auto"
            value={maxCookingTime}
            onChange={handleCookingTimeChange}
            step={5}
            // todo: these labels should be manually aligned instead of setting box mx
            // so the slider doesn't feel unaligned
            marks={[
              {
                value: 0,
                label: COOKING_TIME_OFF_LABEL,
              },
              {
                value: maxCookingTimeRecipe,
                label: `${maxCookingTimeRecipe} mins`,
              },
            ]}
            min={0}
            max={maxCookingTimeRecipe}
          />
        </Box>
      </Stack>
    </>
  );
}
