import {
  Box,
  Button,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import Multiselect from "./Multiselect";
import { useRecipeGalleryContext } from "../recipe-gallery/context/RecipeGalleryContext";
import SearchInput from "./SearchInput";

const COOKING_TIME_OFF_LABEL = "off";

export default function FilterForm() {
  const {
    setSelectedCuisines,
    setSelectedRestrictions,
    setMaxCookingTime,
    maxCookingTime,
    cuisines,
    restrictions,
    selectedCuisines,
    selectedRestrictions,
    maxCookingTimeFromRecipe,
    resetFilters,
  } = useRecipeGalleryContext();

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

  const cookingTimeLabel =
    maxCookingTime === 0 ? COOKING_TIME_OFF_LABEL : `${maxCookingTime}mins`;

  return (
    <>
      <Stack sx={{ m: 2, gap: 4 }}>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h5">Search by</Typography>
          <SearchInput label="Title or ingredient" />
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography variant="h5">Filter recipe by</Typography>
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
              onChange={(e, value) => setMaxCookingTime(value)}
              step={5}
              // todo: these labels should be manually aligned instead of setting box mx
              // so the slider doesn't feel unaligned
              marks={[
                {
                  value: 0,
                  label: COOKING_TIME_OFF_LABEL,
                },
                {
                  value: maxCookingTimeFromRecipe,
                  label: `${maxCookingTimeFromRecipe} mins`,
                },
              ]}
              min={0}
              max={maxCookingTimeFromRecipe}
            />
          </Box>
        </Stack>

        <Button
          sx={{ width: "100%", mt: 8 }}
          onClick={resetFilters}
          variant="outlined"
        >
          Reset
        </Button>
      </Stack>
    </>
  );
}
